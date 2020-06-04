import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Col,
  Table,
  Media,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button, Spinner, Alert, Nav, NavItem, NavLink, CardBody,
} from "reactstrap";
// core components

import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import Pagination from "react-js-pagination";
import Executive from "../../models/Executive";
import {connect} from "react-redux";
import classnames from "classnames";
import {Bar, Line, HorizontalBar , Pie} from "react-chartjs-2";
import {getGraphDataProducts} from '../../Utils'
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
  horizontalGraph,
  pieGraph
} from "variables/charts.js";
import Chart from "chart.js";
import CustomDropdown from "../../components/Dropdown";

//id,name,prod cost, selling price,, quantity

class ReportsProductwise extends React.Component {
  constructor(props){
    super(props);
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  state = {
    alert:'info',
    visible: true,
    processing:true,
    msg:null,

    stock:[],
    activeNav: 1,
    activeNavBar: 1,
    activeButtonProduct: '1',
    horizontalGraphData:'bestSellingProductsMonth',
    agent_id: null,
    pageSize: 10,
    activePage: 1,
    productsByMonth: [],
    productsByYear: [],
    products: 'productsByMonth',
    chartExample2Data: "data3",
  };

  componentDidMount = async () => {

    const productsByMonth = await Executive.getTopProductsByMonth(this.props.user.uid);
    const productsByYear = await Executive.getTopProductsByYear(this.props.user.uid);
    if (productsByYear.success && productsByMonth.success) {
      console.log(productsByMonth);
      horizontalGraph.bestSellingProductsMonth = (canvas) => (getGraphDataProducts(productsByMonth.data));
      horizontalGraph.bestSellingProductsYear = (canvas) => (getGraphDataProducts(productsByYear.data));
      this.setState({
        productsByMonth: productsByMonth.data,
        productsByYear: productsByYear.data,
        visible:false
      })
    }
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
    this.setState({
      stock
    })
  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      horizontalGraphData:
        this.state.horizontalGraphData === "bestSellingProductsMonth" ? "bestSellingProductsYear" : "bestSellingProductsMonth",
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

  onClick = (e) => {
    const button = e.target.value;
    if(button === '1'){
      this.props.history.push()
    }else if (button === '2'){
      this.props.history.push()
    }else{
      this.props.history.push()
    }
  };

  onClickProduct = (e) => {
    const button = e.target.value;
    this.setState({
      activeButtonProduct : button,
      products :
        button === '1' ? 'productsByMonth' : 'productsByYear'
    })
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
  renderHorizontalBarGraph = (data) => {
    return (
      <Col className="mb-5 mb-xl-0" xl="12">
        <Card className="bg-gradient-default shadow">
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <div className="col">
                <h6 className="text-uppercase text-light ls-1 mb-1">
                  Top Trending Products
                </h6>
                <h2 className="text-white mb-0">Based on the sales from last {this.state.activeNav === 1 ? 'month' : 'year'}</h2>
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
              <HorizontalBar
                data={data}
                options={horizontalGraph.options}
                getDatasetAtEvent={e => console.log(e)}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    )
  };

  renderTopSellingProducts = () => {

    return (
      <Col className="mb-5 mb-xl-0" xl="12">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row>
                <Col lg={5}>
                  <h3 className="mb-0">Reports</h3>
                </Col>
                <Col lg={7}>
                  <div className="pagination justify-content-end mb-0">
                    <span>
                      <Button size={'md'} value={'1'} color={this.state.activeButtonProduct === '1' ? 'primary' : 'secondary'}
                              onClick={this.onClickProduct}>Last Month</Button>
                      <Button size={'md'} value={'2'} color={this.state.activeButtonProduct === '2' ? 'primary' : 'secondary'}
                              onClick={this.onClickProduct}>Last Year</Button>
                    </span>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Revenue</th>
              </tr>
              </thead>
              <tbody>
              {this.state[this.state.products].map((item, index) => (
                <tr key={index.toString()}>
                  <td>{item.product_name}</td>
                  <td>
                    {item.total_revenue}
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
            <CardFooter className="py-4">
              <div className="pagination justify-content-end mb-0">
              </div>
            </CardFooter>
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
          <Alert color={this.state.alert} isOpen={this.state.visible} style={{position:'fixed',left:'50%',top:'50%',zIndex:999}}>
            {this.state.processing ? <Spinner style={{ width: '3rem', height: '3rem' }} /> : this.state.msg}
          </Alert>
          <Row>
            <div className="col">
              <span>
                <Button size={'lg'} value={'1'} color={'primary'}
                        onClick={this.onClick}>Productwise Sales</Button>
                <Button size={'lg'} value={'2'} color={'secondary'}
                        onClick={this.onClick}>Top Selling Districts</Button>
                <Button size={'lg'} value={'3'} color={ 'secondary'}
                        onClick={this.onClick}>Agentwise Sales</Button>

            </span>
            </div>
          </Row>
          {/* Table */}
          <Row className={'mt-7'}>
            {this.renderHorizontalBarGraph(horizontalGraph[this.state.horizontalGraphData])}
          </Row>
          {/*pie graph*/}
          <Row className={'mt-5'}>
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Top Trending
                      </h6>
                      <h2 className="text-white mb-0">Products</h2>
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
                    <Pie
                      data={pieGraph.data1}
                      options={pieGraph.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

        {/*  single product */}
        <Row className={'mt-5'}>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      product specific details
                    </h6>
                    <h2 className="text-white mb-0">Select a product from the dropdown to view overall details</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* dropdown */}
                <Row>
                  <Col xl="4">
                    <CustomDropdown data={this.state.stock} initial="Select a product"
                                    disabled={this.state.stock.length === 0} onSelect={this.onSelect}/>
                  </Col>
                </Row>
                {/* Chart 1 */}

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
                            <Line
                              data={this.state.barData}
                              options={chartExample2.options}
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  }
                </Row>
              {/*  bar 2*/}
                <Row className="mt-5">
                  {this.renderBarGraph(chartExample2[this.state.chartExample2Data])}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
          {/* final table black container*/}
          <Row className={'mt-5'}>
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        product specific details
                      </h6>
                      <h2 className="text-white mb-0">Select a product from the dropdown to view overall details</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {this.renderTopSellingProducts()}
                </CardBody>
              </Card>
            </Col>
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
)(ReportsProductwise);

