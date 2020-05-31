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
import Executive from "../../models/Executive";

import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import {toast, ToastContainer} from "react-toastify";

//id,name,prod cost, selling price,, quantity

class StockAddNewProduct extends React.Component {
  state = {
    alert:'info',
    visible: false,
    processing:true,
    msg:null,
  };

  onSubmit = async (e) => {
    this.setState({
      visible:true
    })
    e.preventDefault();
    let productData = {};
    for(let i=0; i<5;i++){
      const attri = e.target[i].id;
      productData[attri] = e.target[i].value
    }
    const res = await Executive.addNewProduct(productData);
    if(res.success){
      toast.success(` New product added successfully!`,);
    }else {
      toast.error(` Adding failed. Something went wrong`,{
        autoClose:false,
        position:"bottom-left"
      });
    }
    this.setState({
      visible:false
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
          <Alert color={this.state.alert} isOpen={this.state.visible} style={{position:'fixed',left:'50%',top:'50%',zIndex:999}}>
            {this.state.processing ? <Spinner style={{ width: '3rem', height: '3rem' }} /> : this.state.msg}
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
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="productCost"
                          >
                            Product Cost
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="productCost"
                            type="text"
                            required={true}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="sellingPrice"
                          >
                            Selling Price
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="sellingPrice"
                            type="text"
                            required={true}
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

export default StockAddNewProduct;
