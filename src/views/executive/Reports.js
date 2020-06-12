import React from "react";

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

import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import Pagination from "react-js-pagination";
import Executive from "../../models/Executive";
import {connect} from "react-redux";
import classnames from "classnames";
import {Bar} from "react-chartjs-2";
import {getGraphDataProducts} from '../../Utils'
import {
  chartExample1,
  chartExample2
} from "variables/charts.js";


class ExecReports extends React.Component {
  state = {
    alert:'info',
    visible: true,
    processing:true,
    msg:null,

    agent_id: null,
    agentData: [],
    pageSize: 5,
    activePage: 1,
    activeButton: '1',
    activeButtonDistrict: '1',
    activeButtonProduct: '1',
    productsByMonth: [],
    productsByYear: [],
    products: 'productsByMonth',
    districtsByMonth: [],
    districtsByYear: [],
    districts: 'districtsByMonth'
  };

  componentDidMount = async () => {
    const res = await Executive.getAllAgents();
    this.setState({
      agentData: res,
      visible: false
    });

  };

  seeReports = (agent_id) => {
    this.props.history.push({
      pathname: '/executive/reports/view-reports',
      state: {agent_id: agent_id}
    })
  };

  renderTableRows = () => {
    const {pageSize, activePage, agentData} = this.state;
    const pagedArray = agentData.slice(pageSize * (activePage - 1), pageSize * activePage);
    return pagedArray.map((item, index) => (
        <tr key={index.toString()}>
          <th scope="row">
            <Media className="align-items-center">
              <Media>
                <span className="mb-0 text-sm">
                  {item.firstName}
                </span>
              </Media>
            </Media>
          </th>
          <td>{item.region}</td>
          <td className="text-right">
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn-icon-only text-light"
                href="#pablo"
                role="button"
                size="sm"
                color=""
                onClick={e => e.preventDefault()}
              >
                <i className="fas fa-ellipsis-v"/>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem
                  href="#pablo"
                  onClick={e => {
                    e.preventDefault();
                    this.seeReports(item.uid)
                  }}
                >
                  See Reports
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
      )
    )
  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  onClick = async (e) => {
    const button = e.target.value;
    this.setState({
      activeButton: button
    });
    if (button === '2' && this.state.productsByMonth.length === 0) {
      this.setState({
        visible:true
      });
      const productsByMonth = await Executive.getTopProductsByMonth(this.props.user.uid);
      const productsByYear = await Executive.getTopProductsByYear(this.props.user.uid);
      if (productsByYear.success && productsByMonth.success) {
        console.log(productsByMonth);

        chartExample1.bestSellingProductsMonth = (canvas) => (getGraphDataProducts(productsByMonth.data));
        chartExample1.bestSellingProductsYear = (canvas) => (getGraphDataProducts(productsByYear.data));
        this.setState({
          productsByMonth: productsByMonth.data,
          productsByYear: productsByYear.data,
          visible:false
        })
      }

    } else if (button === '3' && this.state.districtsByMonth.length === 0) {
      this.setState({
        visible:true
      });
      const districtsByMonth = await Executive.getTopDistrictsByMonth();
      const districtsByYear = await Executive.getTopDistrictsByYear();
      if (districtsByMonth.success && districtsByYear.success) {
        this.setState({
          districtsByMonth: districtsByMonth.data,
          districtsByYear: districtsByYear.data,
          visible: false
        })
      }
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
              <Bar
                data={chartExample1.data1}
                options={chartExample2.options}
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

  onClickDistrict = (e) => {
    const button = e.target.value;
    this.setState({
      activeButtonDistrict : button,
      districts :
        button === '1' ? 'districtsByMonth' : 'districtsByYear'
    })
  };

  renderTopSellingDistricts = () => {
    return (

      <Row className='mt-7'>
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
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
                      <Button size={'md'} value={'1'} color={this.state.activeButtonDistrict === '1' ? 'primary' : 'secondary'}
                              onClick={this.onClickDistrict}>Last Month</Button>
                      <Button size={'md'} value={'2'} color={this.state.activeButtonDistrict === '2' ? 'primary' : 'secondary'}
                              onClick={this.onClickDistrict}>Last Year</Button>
                    </span>
                  </div>
                </Col>
              </Row>

            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
              <tr>
                <th scope="col">District</th>
                <th scope="col">Revenue</th>
              </tr>
              </thead>
              <tbody>
              {this.state[this.state.districts].map((item, index) => (
                <tr key={index.toString()}>
                  <td>{item.district_name}</td>
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

  renderAgentwiseSales = () => {
    return (
      <Row className='mt-7'>
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
        </Col>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">Reports</h3>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">District</th>
                <th scope="col"/>
              </tr>
              </thead>
              <tbody>
              {this.renderTableRows()}
              </tbody>
            </Table>
            <CardFooter className="py-4">
              <div className="pagination justify-content-end mb-0">
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={5}
                  totalItemsCount={this.state.agentData.length}
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
    )
  };

  renderContent = () => {
    if (this.state.activeButton === '1') {
      return this.renderAgentwiseSales()
    } else if (this.state.activeButton === '2') {
      return this.renderTopSellingProducts()

    } else {
      return this.renderTopSellingDistricts()
    }
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
                <Button size={'lg'} value={'1'} color={this.state.activeButton === '1' ? 'primary' : 'secondary'}
                        onClick={this.onClick}>Agentwise Sales</Button>
                <Button size={'lg'} value={'2'} color={this.state.activeButton === '2' ? 'primary' : 'secondary'}
                        onClick={this.onClick}>Productwise Sales</Button>
                <Button size={'lg'} value={'3'} color={this.state.activeButton === '3' ? 'primary' : 'secondary'}
                        onClick={this.onClick}>Top Selling Districts</Button>
            </span>
            </div>
          </Row>
          {/* Table */}
          {this.renderContent()}
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
)(ExecReports);

