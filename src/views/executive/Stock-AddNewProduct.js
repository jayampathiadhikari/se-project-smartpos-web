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
import SimpleReactValidator from "simple-react-validator";
//(/^([P][R])\d{4}$/)
//id,name,prod cost, selling price,, quantity

class StockAddNewProduct extends React.Component {
  constructor(props){
    super(props);
    this.validator = new SimpleReactValidator({
      validators: {
        productID: {  // name the rule
          message: 'The :attribute must be of type (PRXXXX) ',
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val,/^([P][R])\d{4}$/)
          },
        },

      }
    });
  }

  state = {
    alert:'info',
    visible: false,
    processing:true,
    msg:null,
    exists: false,

    productID: '',
    productName: '',
    productCost: '',
    sellingPrice: '',
    quantity: ''

  };

  onSubmit = async (e) => {
    e.preventDefault();
    if(this.validator.allValid()){
      if(!this.state.exists){
        this.setState({
          visible:true
        });
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
      }else{
        toast.error(` ProductID is already in use `, {
          position: "bottom-left",
          autoClose: false
        });
      }
    }else{
      toast.error(` Check the form data`, {
        position: "bottom-left",
        autoClose: false
      });
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  onBlur = async () => {
    if((/^([P][R])\d{4}$/).test(this.state.productID)){
      const res = await Executive.checkProductIdAvailablity(this.state.productID);
      if(res.success){
        if(res.data[0]['exists']){
          this.setState({
            exists: true
          });

        }
      }
    }

  };

  onChangeInput = (e) => {
    const target = e.target;
    const value = target.value;
    console.log(value);
    this.setState({
      [target.id]: value
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
                            onBlur = {this.onBlur}
                            onChange = {this.onChangeInput}
                          />
                          <div className="text-warning mb-4 ml-2">
                            <small>{this.validator.message('product id', this.state.productID, 'productID')}</small>
                          </div>
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
                            onChange = {this.onChangeInput}
                          />
                          <div className="text-warning mb-4 ml-2">
                            <small>{this.validator.message('product name', this.state.productName, 'alpha')}</small>
                          </div>
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
                            onChange = {this.onChangeInput}
                          />
                          <div className="text-warning mb-4 ml-2">
                            <small>{this.validator.message('product cost', this.state.productCost, 'currency')}</small>
                          </div>
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
                            onChange = {this.onChangeInput}
                          />
                          <div className="text-warning mb-4 ml-2">
                            <small>{this.validator.message('selling price', this.state.sellingPrice, 'currency')}</small>
                          </div>
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
                            onChange = {this.onChangeInput}
                          />
                          <div className="text-warning mb-4 ml-2">
                            <small>{this.validator.message('quantity', this.state.quantity, 'integer')}</small>
                          </div>
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
