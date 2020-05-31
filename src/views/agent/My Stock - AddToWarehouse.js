import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Container,
  Row,
  Button, Col, FormGroup, Input, Alert, Spinner
} from "reactstrap";
// core components

import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import {connect} from "react-redux";
import Agent from "../../models/Agent";
import {toast, ToastContainer} from "react-toastify";

//id,name,prod cost, selling price,, quantity

class MyStockAddToWarehouse extends React.Component {
  state = {
    visible: false,
    agent_id: null,
    current_data: [],
    pageSize: 5,
    activePage:1,
    product: null
  };

  componentDidMount() {
    if(this.props.location.state !== undefined){
      this.setState({
        product : this.props.location.state.product
      });
    }
  }

  onSubmit = async(e) => {
    e.preventDefault();
    this.setState({
      visible: true
    });
    let productData = {};
    for(let i=0; i<3;i++){
      const attri = e.target[i].id;
      productData[attri] = e.target[i].value
    }
    if(productData.productID === "NO PRODUCT SELECTED"){
      toast.error(` No product is selected`,{
        autoClose:false,
        position:"bottom-left"
      });
    }else{
      await this.addToWarehouse(productData);
    }

  };

  addToWarehouse = async (productData) => {
      const res = await Agent.addStockToWarehouse(this.props.user.uid,productData.productID,productData.quantity);
      if(res.data.success){
        toast.success(` Successfully added to warehouse`)
      }else{
        toast.error(` Something went wrong`,{
          autoClose:false,
          position:"bottom-left"
        });
      }
      this.setState({
        visible: false
      })
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
          {/* Table */}
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            </Col>
            <div className="col">
              <Card className="bg-secondary shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Product Info</h3>
                </CardHeader>
                <CardBody>
                  <div className="pl-lg-4">
                    <Form onSubmit={(e)=>{this.onSubmit(e)}}>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="productID"
                            >
                              Product ID
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="productID"
                              type="text"
                              required={true}
                              disabled
                              value = {this.state.product != null ? this.state.product.product_id : 'NO PRODUCT SELECTED' }
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="productName"
                            >
                              Product Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="productName"
                              type="text"
                              required={true}
                              disabled
                              value = {this.state.product != null ? this.state.product.name : 'NO PRODUCT SELECTED' }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="quantity"
                            >
                              Quantity
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="quantity"
                              type="text"
                              required={true}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="9"/>
                        <Col md="3">
                          <Button className="my-0" color="primary" type="submit">
                            Add Product
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
                <CardFooter className="py-4">
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
)(MyStockAddToWarehouse);

