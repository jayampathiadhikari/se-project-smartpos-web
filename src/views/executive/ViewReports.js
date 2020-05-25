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
import Executive from "../../models/Executive";





class ViewReports extends React.Component {
  state = {
    selectedDate:null,
    agent_id: null,
    activePage : 1,
    reports:[],
    data: [],
    showReports: false
  };

  componentDidMount() {
    if(this.props.location.state != undefined){
      this.setState({
        agent_id : this.props.location.state.agent_id,
      });
      console.log(this.props.location.state.agent_id)
    }else{
      alert('undefined')
    }
  }

  onClick = (product) => {
    this.props.history.push({
      pathname: '/executive/my-stock/add-to-warehouse',
      state: {product:product}
    })
  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  renderTableRows = () => {
    return this.state.data.map((item,index) => (
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
          <td>{item.pr_cost}</td>
          <td>{item.selling_price}</td>
          <td className="text-right">
            <Button color="primary" size={'md'} onClick={()=>{this.onClick(item)}}>
              +
            </Button>
          </td>
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
    const {agent_id,selectedDate} = this.state;
    if(this.state.selectedDate){
      const res = await Executive.getReports(agent_id,selectedDate);
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
                      <th scope="col"/>
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

export default ViewReports;
