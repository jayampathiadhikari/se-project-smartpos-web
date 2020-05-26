import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Media,
  Table,
  Container,
  Row,
  Col,
  Button, Input
} from "reactstrap";
// core components
import Datepicker from "../../components/DateTime";
import Pagination from "react-js-pagination";
import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import Agent from "../../models/Agent";
import {connect} from "react-redux";

// "2020-04-30"
// "2019-05-22"
// "2020-04-30"
// "2020-05-22"
// "2020-04-24"
// "2020-04-24" ------
// "2019-05-24"
// "2019-05-24"
// "2019-05-24"
// "2020-03-24"
// "2019-05-24"
// "2020-04-24"
// "2019-03-24"
// "2019-04-24"
// "2020-04-24"

//agent_id: "ySRNCA8E4hacmi9ZNsofSki5Uyv1"
// name: "chilly powder"
// product_id: "1"
// production_cost: 90
// quantity: 600
// sales_id: 24
// salesperson_id: "W9FfmzqWI6QZjGWpRnZOpBhwGM02"
// selling_price: 100
// shop_id: 8
// sold_date: "2020-04-24T00:00:00.000Z"


class MyReports extends React.Component {
  state = {
    selectedDate:null,
    activePage : 1,
    pageSize: 5,
    reports:[],
    data: [],
    showReports: false
  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  renderTableRows = () => {
    const {pageSize, activePage,data} = this.state;
    const pagedArray = data.slice(pageSize*(activePage-1),pageSize*activePage);
    return pagedArray.map((item,index) => (
        <tr key={index.toString()}>
          <th scope="row">
            <Media className="align-items-center">
              <Media>
                <span className="mb-0 text-sm">
                  {item.product_id}
                </span>
              </Media>
            </Media>
          </th>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>{item.production_cost}</td>
          <td>{item.selling_price}</td>
          <td>{item.salesperson_id}</td>
          <td>{item.shop_id}</td>
        </tr>
      )
    )
  };

  filter = (e) => {
    const filteredArray = this.state.initialData.filter(
      data => {return (data.name.toLowerCase().includes(e.target.value.toLowerCase())) }
    );
    this.setState({
      data:filteredArray
    });
  };

  onSelectDate = (e) => {
    const date = this.formatDate(e.format());
    this.setState({
      selectedDate: date
    });
  };

  formatDate = (date) => (date.split('T')[0]);

  getReports = async() => {
    const {selectedDate} = this.state;
    if(this.state.selectedDate){
      const res = await Agent.getReports(this.props.user.uid,selectedDate);
      if(res.data.success){
        if(res.data.data.length > 0){
          this.setState({
            data:res.data.data,
            showReports:true
          })
        }else{
          alert('NO REPORTS FOR GIVEN DATE')
        }
      }else{
        alert('FETCHING ERROR')
      }
      console.log(res.data)
    }
  };

  render() {
    console.log(this.props.user.uid)
    return (
      <>
        <HeaderNoCards/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col lg={4}>
              <Datepicker onChange = {this.onSelectDate}/>
            </Col>
            <Col lg={4}>
              <Button size={'md'} onClick={this.getReports}>Get Reports</Button>
            </Col>
          </Row>
          {/* Table */}
          {this.state.showReports ?
            <Row className={"mt-7"}>
              <div className="col">
                <Card className="bg-default shadow">
                  <CardHeader className="bg-transparent border-0">
                    <Row>
                      <Col lg={7}>
                        <h3 className="text-white mb-0">{this.state.selectedDate} Reports</h3>
                      </Col>
                    </Row>
                  </CardHeader>
                  <Table className="align-items-center table-dark table-flush" responsive>
                    <thead className="thead-dark">
                    <tr>
                      <th scope="col">Product ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Production Cost</th>
                      <th scope="col">Selling Price</th>
                      <th scope="col">Salesperson ID</th>
                      <th scope="col">Shop ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTableRows()}
                    </tbody>
                  </Table>
                  <CardFooter className="py-4 bg-transparent border-0">
                    <div className="pagination justify-content-end mb-0">
                      <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={5}
                        totalItemsCount={this.state.data.length}
                        pageRangeDisplayed={3}
                        onChange={this.handlePageChange.bind(this)}
                        itemClass="page-item"
                        linkClass="page-link"
                      />
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </Row> : null
          }
        </Container>
      </>
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.AuthenticationReducer.user,
});

const bindAction = () => ({
});

export default connect(
  mapStateToProps,
  bindAction
)(MyReports);
