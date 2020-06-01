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
  Button, Input, Alert, Spinner
} from "reactstrap";
// core components

import Pagination from "react-js-pagination";
import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import CustomDropdown from "../../components/Dropdown";
import Agent from "../../models/Agent";
import {connect} from "react-redux";
import {getSalespersonByAgent} from "../../Utils";
import {toast, ToastContainer} from "react-toastify";



class MyStockLoad extends React.Component {
  state = {
    visible: true,
    agent_id: null,
    activePage : 1,
    initialData:[],
    pageSize:5,
    data: [],
    salesperson:[],
    loadAmount:null,
    salesperson_id:null
  };
  target = null;

  componentDidMount = async() => {
    const uid = this.props.user.uid;
    const result = await getSalespersonByAgent(uid);
    const res = await Agent.getStock(uid);
    if(res.data.success){
      this.setState({
        visible: false,
        initialData:res.data.data,
        data:res.data.data,
        salesperson:result
      })
    }else{
      this.setState({
        visible: false
      });
      toast.error(` Something went wrong`,{
        autoClose:false,
        position:"bottom-left"
      });
    }
  };

  onClick = async (product) => {
    if(this.state.salesperson_id){
      this.target.value = null;
      const res = await Agent.addStockToSalesperson(this.props.user.uid,this.state.salesperson_id,product.product_id,this.state.loadAmount);
      console.log(res);
      if(res.success){
        toast.success(`Stock added successfully`)
        const uid = this.props.user.uid;
        const res = await Agent.getStock(uid);
        if(res.data.success){
          this.setState({
            initialData:res.data.data,
            data:res.data.data,
          })
        }else{
          toast.error(` Something went wrong`,{
            autoClose:false,
            position:"bottom-left"
          });
        }
      }else{
        toast.error(` Already loaded today`,{
          autoClose:false,
          position:"bottom-left"
        });
      }
    }else{
      toast.error(` No salesperson is selected`,{
        autoClose:false,
        position:"bottom-left"
      });
    }

  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  onChange = (e) => {
    this.target = e.target;
    this.setState({
      loadAmount:e.target.value
    })
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
          <td>
            <Input
              className="form-control-alternative"
              id={item.product_id}
              type="text"
              required={true}
              style={{maxWidth:90}}
              onChange = {this.onChange}
            />
          </td>
          <td className="text-right">
            <Button color="primary" size={'md'} onClick={()=>{this.onClick(item)}}>
              Load
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

  onSelect = (sp) => {
    this.setState({
      salesperson_id: sp.id
    });
    console.log(sp.name,sp.id)
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
            <div className="col">
              <CustomDropdown data = {this.state.salesperson} initial={"SELECT SALESPERSON"} onSelect={this.onSelect}/>
            </div>

          </Row>
          {/* Table */}
          <Row className={"mt-7"}>
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <Row>
                    <Col lg={7}>
                      <h3 className="text-white mb-0">My Stock</h3>
                    </Col>
                    <Col lg={5}>
                      <div>
                        <Input
                          className="form-control-alternative"
                          id="firstName"
                          type="text"
                          placeholder={"Filter by product name..."}
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
                    <th scope="col">Product ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">In Stock</th>
                    <th scope="col">Load Amount</th>
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
                      totalItemsCount={this.state.initialData.length}
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
)(MyStockLoad);

