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
  Button, Alert, Spinner
} from "reactstrap";
// core components
import Datepicker from "../../components/DateTime";
import Pagination from "react-js-pagination";
import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import Agent from "../../models/Agent";
import {connect} from "react-redux";
import {toast, ToastContainer} from "react-toastify";

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
    visible: true,

    selectedDate:null,
    activePage : 1,
    pageSize: 5,
    reports:[],
    data: [],
    showReports: false,
    productsByMonth:[],
    productsByYear:[],
    products: 'productsByMonth',
    activeButtonProduct: '1',
  };

  componentDidMount = async () => {
    const productsByMonth = await Agent.getTopProductsByMonth(this.props.user.uid);
    const productsByYear = await Agent.getTopProductsByYear(this.props.user.uid);
    if (productsByYear.success && productsByMonth.success) {
      this.setState({
        productsByMonth: productsByMonth.data,
        productsByYear: productsByYear.data,
        visible:false
      })
    }else{
      toast.error(` Something went wrong`,{
        autoClose:false,
        position:"bottom-left"
      });
    }
  };

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  onClickProduct = (e) => {
    const button = e.target.value;
    this.setState({
      activeButtonProduct : button,
      products :
        button === '1' ? 'productsByMonth' : 'productsByYear'
    })
  };

  renderTopSellingProducts = () => {
    return (
      <Row className='mt-7'>
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
        </Col>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row>
                <Col lg={5}>
                  <h3 className="mb-0">Reports</h3>
                </Col>
                <Col lg={7}>
                  <div className="pagination justify-content-end mb-0">
                    <span>
                      <Button size={'md'} value={'1'} color={this.state.activeButtonProduct === '1' ? 'primary' : 'secondary'}
                              onClick={this.onClickProduct}>Last Month</Button>
                      <Button size={'md'} value={'2'} color={this.state.activeButtonProduct === '2' ? 'primary' : 'secondary'}
                              onClick={this.onClickProduct}>Last Year</Button>
                    </span>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Revenue</th>
              </tr>
              </thead>
              <tbody>
              {this.state[this.state.products].map((item, index) => (
                <tr key={index.toString()}>
                  <td>{item.product_name}</td>
                  <td>
                    {item.total_revenue}
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
            <CardFooter className="py-4">
              <div className="pagination justify-content-end mb-0">
              </div>
            </CardFooter>
          </Card>
        </div>
      </Row>
    )
  };

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
          toast.error(` No reports for selected date`,{
            autoClose:false,
            position:"bottom-left"
          });
        }
      }else{
        toast.error(` Something went wrong`,{
          autoClose:false,
          position:"bottom-left"
        });
      }

    }else{
      toast.error(` No date selected`,{
        autoClose:false,
        position:"bottom-left"
      });
    }
  };

  render() {
    return (
      <>
        <HeaderNoCards/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover/>
          <Alert color={'info'} isOpen={this.state.visible} style={{position:'fixed',left:'50%',top:'50%',zIndex:999}}>
            <Spinner style={{ width: '3rem', height: '3rem' }} />
          </Alert>
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
          {this.renderTopSellingProducts()}
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
