import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import {Line, Bar} from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col, Spinner, Alert
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import {connect} from "react-redux";
import Agent from "../../models/Agent";
import CustomDropdown from "../../components/Dropdown";
import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import {toast} from "react-toastify";


class AgentIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert:'info',
      visible: true,
      processing:true,
      msg:null,

      productID: null,
      lineData: {},
      stock: [],
      activeNav: 1,
      activeNavBar: 1,
      chartExample1Data: "data1",
      chartExample2Data: "data3",
      barData: {},
      productName: ''
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  componentDidMount = async () => {
    const lineData = await Agent.getLineGraphData(this.props.user.uid);
    const res = await Agent.getStock(this.props.user.uid);
    const stock = [];
    if (res.data.success) {
      res.data.data.forEach((data) => {
        stock.push({
          name: data.name,
          id: data.product_id
        })
      })
    }else {
      toast.error(` Something went wrong`,{
        position:"bottom-left"
      });
    }
    this.setState({
      lineData,
      stock,
      visible:false
    });
  };


  onSelect = async (product) => {
    const barData = await Agent.getBarGraphData(this.props.user.uid, product.id);
    this.setState({
      productName: product.name,
      productID: product.id,
      barData: barData
    })
  };

  render() {
    return (
      <>
        <HeaderNoCards/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Alert color={this.state.alert} isOpen={this.state.visible} style={{position:'fixed',left:'50%',top:'50%',zIndex:999}}>
            {this.state.processing ? <Spinner style={{ width: '3rem', height: '3rem' }} /> : this.state.msg}
          </Alert>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={this.state.lineData}
                      options={chartExample1.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col xl="4">
              <CustomDropdown data={this.state.stock} initial="Select a product"
                              disabled={this.state.stock.length === 0} onSelect={this.onSelect}/>
            </Col>
          </Row>
          {/*bar 1*/}
          <Row className="mt-5">
            {
              <Col xl="12">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                          Annual Performance
                        </h6>
                        {this.state.productID ?
                          <h2 className="mb-0">Total orders of {this.state.productName}</h2> :
                          <h2 className="mb-0">No product selected</h2>
                        }
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      <Bar
                        data={this.state.barData}
                        options={chartExample2.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            }
          </Row>

        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.AuthenticationReducer.user,
});

const bindAction = (dispatch) => ({});

export default connect(
  mapStateToProps,
  bindAction
)(AgentIndex);

