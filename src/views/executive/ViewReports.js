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
  Button, Input, Spinner, Alert
} from "reactstrap";
// core components
import Datepicker from "../../components/DateTime";
import Pagination from "react-js-pagination";
import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import Executive from "../../models/Executive";
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



class ViewReports extends React.Component {
  state = {
    alert:'info',
    visible: false,
    processing:true,
    msg:null,

    selectedDate:null,
    agent_id: null,
    activePage : 1,
    pageSize: 5,
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


  onSelectDate = (e) => {
    const date = this.formatDate(e.format());
    this.setState({
      selectedDate: date
    });
  };

  formatDate = (date) => (date.split('T')[0]);

  getReports = async() => {
    this.setState({
      visible:true
    });
    const {agent_id,selectedDate} = this.state;
    if(this.state.selectedDate){
      const res = await Executive.getReports(agent_id,selectedDate);
      if(res.data.success){
        this.setState({
          visible:false
        });
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
        this.setState({
          visible:false
        });
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
          <Alert color={this.state.alert} isOpen={this.state.visible} style={{position:'fixed',left:'50%',top:'50%',zIndex:999}}>
            {this.state.processing ? <Spinner style={{ width: '3rem', height: '3rem' }} /> : this.state.msg}
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

        </Container>
      </>
    );
  }
}

export default ViewReports;
