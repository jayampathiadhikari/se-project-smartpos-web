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
import {Bar, Line, HorizontalBar, Doughnut, Pie} from "react-chartjs-2";
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

    activeNav: 1,
    horizontalGraphData:'bestSellingProductsMonth',
    agent_id: null,
    pageSize: 10,
    activePage: 1,
    productsByMonth: [],
    productsByYear: [],
    products: 'productsByMonth',

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
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
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

  renderBarGraph = (data) => {
    return (
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

  renderDoughnut = (data) => {
    return (
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
                data={data}
                options={pieGraph.options}
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
      <Row className='mt-7'>
        <Col className="mb-5 mb-xl-0" xl="12">
        </Col>
        <div className="col">
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
        </div>
      </Row>
    )
  };


  renderContent = () => {
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
            {this.renderBarGraph(horizontalGraph[this.state.horizontalGraphData])}
          </Row>

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

