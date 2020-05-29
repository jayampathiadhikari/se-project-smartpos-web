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
import Pagination from "react-js-pagination";

import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import Agent from '../../models/Agent'
import {getDistrictId} from "../../Utils";
import {connect} from "react-redux";

//id,name,prod cost, selling price,, quantity

// 'name','route_id','latitude','longitude','shop_contact_num','name_with_initial','contact_num_cell','contact_num_land',
// 'email'
// 'residence_lattitude',
// 'residence_longitude',

class ShopSuggestShop extends React.Component {
  state = {
    agent_id: null,
    current_data: [],
    pageSize: 5,
    activePage:1
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let productData = {};
    for(let i=0; i<10 ;i++){
      const attri = e.target[i].id;
      productData[attri] = e.target[i].value
    }
    const region = this.props.user.region;
    const districtID = getDistrictId(region);
    productData.districtID = districtID;

    const res = await Agent.suggestShop(productData);
    console.log(res);

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
                  <h3 className="mb-0">Shop Info</h3>
                </CardHeader>
                <CardBody>
                  <div className="pl-lg-4">
                    <Form onSubmit={(e)=>{this.onSubmit(e)}}>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="shopName"
                            >
                              Shop Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="shopName"
                              type="text"
                              required={true}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="shopNo"
                            >
                              Shop Contact No
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="shopNo"
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
                              htmlFor="latitude"
                            >
                              Latitude
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="latitude"
                              type="text"
                              required={true}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="longitude"
                            >
                              Longitude
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="longitude"
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
                              htmlFor="owner"
                            >
                              Owner
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="owner"
                              type="text"
                              required={true}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="email"
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
                              htmlFor="mobile"
                            >
                              Mobile
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="mobile"
                              type="text"
                              required={true}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="land"
                            >
                              Land Phone
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="land"
                              type="text"
                              required={false}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="reslat"
                            >
                              Residence Latitude
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="reslat"
                              type="text"
                              required={true}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="reslng"
                            >
                              Residence Longitude
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="reslng"
                              type="text"
                              required={false}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="9"/>
                        <Col md="3">
                          <Button className="my-0" color="primary" type="submit">
                            Suggest Shop
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
)(ShopSuggestShop);

