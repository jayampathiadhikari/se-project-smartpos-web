import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip, Button, Input, Spinner, Alert
} from "reactstrap";
// core components
import Pagination from "react-js-pagination";
import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import {getDistrictId} from "../../Utils";
import {connect} from "react-redux";
import Agent from '../../models/Agent'
import {toast, ToastContainer} from "react-toastify";

//need to implement filter
class MyShops extends React.Component {
  state = {
    alert:'info',
    visible: true,

    agent_id: null,
    activePage : 1,
    pageSize:5,
    initialData:[],
    data: []
  };

  componentDidMount = async () => {
    const res = await Agent.getShops(getDistrictId(this.props.user.region));
    if(res.data.success){
      if(res.data.data.length === 0){
        toast.warn(` You have no shops`,{
          autoClose:false,
          position:"bottom-left"
        });
      }
      this.setState({
        initialData:res.data.data,
        data:res.data.data,
        visible: false
      })
    }else{
      toast.error(` Something went wrong`,{
        autoClose:false,
        position:"bottom-left"
      });
    }
  };

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
    const {pageSize, activePage,data} = this.state;
    const pagedArray = data.slice(pageSize*(activePage-1),pageSize*activePage);
    return pagedArray.map((item,index) => (
        <tr key={index.toString()}>

          <td>{item.name}</td>
          <td>{item.shop_contact_num}</td>
          <td>{item.name_with_initial}</td>
          <td>{item.contact_num_cell}</td>
          <td>{item.contact_num_land}</td>
          <td>{item.email}</td>
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

  render() {
    return (
      <>
        <HeaderNoCards/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <ToastContainer
            position="top-right"
            autoClose={10000}
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
            <div className="col">
              <span>
                <Button size={'lg'} onClick={()=>{this.props.history.push('/agent/my-shops/suggest-shop')}}>Suggest New Shop</Button>
              </span>
            </div>
          </Row>
          {/* Table */}
          <Row className={"mt-7"}>
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <Row>
                    <Col lg={7}>
                      <h3 className="text-white mb-0">My Shops</h3>
                    </Col>
                    <Col lg={5}>
                      <div>
                        <Input
                          className="form-control-alternative"
                          id="firstName"
                          type="text"
                          placeholder={"Filter by shop name..."}
                          autoComplete = "false"
                          onChange = {this.filter}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-dark table-flush" responsive>
                  <thead className="thead-dark">
                  <tr>
                    <th scope="col">Shop Name</th>
                    <th scope="col">Shop Contact</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Owner Mobile</th>
                    <th scope="col">Owner Contact</th>
                    <th scope="col">Email</th>
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
          </Row>
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
)(MyShops);

