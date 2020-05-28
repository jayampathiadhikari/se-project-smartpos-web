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
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import {connect} from "react-redux";
import Executive from "../../models/Executive";
import CustomDropdown from "../../components/Dropdown";
import HeaderNoCards from "../../components/Headers/HeaderNoCards";

class ExecIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const lineData = await Executive.getLineGraphData(this.props.user.uid);
    const districtMonthLineData = await Executive.getDistrictMonthLineData();
    const districtYearLineData = await Executive.getDistrictYearLineData();
    const res = await Executive.getStock();
    const stock = [];
    if (res.success) {
      res.data.forEach((data) => {
        stock.push({
          name: data.name,
          id: data.product_id
        })
      })
    }
    chartExample1.data1 = (canvas) => (districtMonthLineData);
    chartExample1.data2 = (canvas) => (districtYearLineData);
    this.setState({
      lineData,
      stock
    });
  };


  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1",
    });
  };

  toggleNavsBar = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNavBar: index,
      chartExample2Data:
        this.state.chartExample2Data === "data3" ? "data4" : "data3",
    });
  };


  renderLineGraph = (data) => {
    // const graphData = data;
    // console.log(graphData,'GRAPH DATA')
    return (
      <Col className="mb-5 mb-xl-0" xl="12">
        <Card className="bg-gradient-default shadow">
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <div className="col">
                <h6 className="text-uppercase text-light ls-1 mb-1">
                  Districtwise
                </h6>
                <h2 className="text-white mb-0">Sales value</h2>
              </div>
              <div className="col">
                <Nav className="justify-content-end" pills>
                  <NavItem>
                    <NavLink
                      className={classnames("py-2 px-3", {
                        active: this.state.activeNav === 1
                      })}
                      href="#pablo"
                      onClick={e => this.toggleNavs(e, 1)}
                    >
                      <span className="d-none d-md-block">Month</span>
                      <span className="d-md-none">M</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames("py-2 px-3", {
                        active: this.state.activeNav === 2
                      })}
                      data-toggle="tab"
                      href="#pablo"
                      onClick={e => this.toggleNavs(e, 2)}
                    >
                      <span className="d-none d-md-block">Year</span>
                      <span className="d-md-none">W</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Row>
          </CardHeader>
          <CardBody>
            {/* Chart */}
            <div className="chart">
              <Line
                data={data}
                options={chartExample1.options}
                getDatasetAtEvent={e => console.log(e)}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    )
  };

  onSelect = async (product) => {
    const barData = await Executive.getBarGraphData(this.props.user.uid, product.id);
    const barDataDistrictMonthly = await Executive.getDistrictMonthBarData(product.id);
    const barDataDistrictAnnually = await Executive.getDistrictYearBarData(product.id);

    chartExample2.data3 = (canvas) => (barDataDistrictMonthly);
    chartExample2.data4 = (canvas) => (barDataDistrictAnnually);
    this.setState({
      productName: product.name,
      productID: product.id,
      barData: barData
    })
  };

  renderBarGraph = (data) => {
    return (
      <Col className="xl-12">
        <Card className="shadow">
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <div className="col">
                <h6 className="text-uppercase text-muted ls-1 mb-1">
                  District wise Performance
                </h6>
                {this.state.productID ?
                  <h2 className="mb-0">Total orders of {this.state.productName}</h2> :
                  <h2 className="mb-0">No product selected</h2>
                }
              </div>
              <div className="col">
                <Nav className="justify-content-end" pills>
                  <NavItem>
                    <NavLink
                      className={classnames("py-2 px-3", {
                        active: this.state.activeNavBar === 1
                      })}
                      href="#pablo"
                      onClick={e => this.toggleNavsBar(e, 1)}
                    >
                      <span className="d-none d-md-block">Month</span>
                      <span className="d-md-none">M</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames("py-2 px-3", {
                        active: this.state.activeNavBar === 2
                      })}
                      data-toggle="tab"
                      href="#pablo"
                      onClick={e => this.toggleNavsBar(e, 2)}
                    >
                      <span className="d-none d-md-block">Year</span>
                      <span className="d-md-none">W</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Row>
          </CardHeader>
          <CardBody>
            {/* Chart */}
            <div className="chart">
              <Bar
                data={data}
                options={chartExample2.options}
                getDatasetAtEvent={e => console.log(e)}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    )
  };

  render() {
    return (
      <>
        <HeaderNoCards/>
        {/* Page content */}
        <Container className="mt--7" fluid>
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
            {this.renderLineGraph(chartExample1[this.state.chartExample1Data])}
          </Row>

          <Row className="mt-5">

            <Col xl="4">
              <CustomDropdown data={this.state.stock} initial="Select a product"
                              disabled={this.state.stock.length === 0} onSelect={this.onSelect}/>
            </Col>
          </Row>

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
          {/*second graph*/}
          <Row className="mt-5">
            {this.renderBarGraph(chartExample2[this.state.chartExample2Data])}
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
)(ExecIndex);

