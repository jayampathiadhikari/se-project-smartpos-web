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
  Button, Col, FormGroup, Input
} from "reactstrap";
// core components

import HeaderNoCards from "../../components/Headers/HeaderNoCards";

//id,name,prod cost, selling price,, quantity

class StockAddToWarehouse extends React.Component {
  state = {
    agent_id: null,
    current_data: [],
    pageSize: 5,
    activePage:1,
    product: null
  };

  componentDidMount() {
    if(this.props.location.state != undefined){
      this.setState({
        product : this.props.location.state.product
      });
      console.log(this.props.location.state.product)
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    let productData = {};
    for(let i=0; i<3;i++){
      const attri = e.target[i].id;
      productData[attri] = e.target[i].value
    }
    if(productData.productID === "NO PRODUCT SELECTED"){
      alert("NO PRODUCT SELECTED")
    }
    console.log(productData);
  };

  render() {
    return (
      <>
        <HeaderNoCards/>
        {/* Page content */}
        <Container className="mt--7" fluid>
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

export default StockAddToWarehouse;
