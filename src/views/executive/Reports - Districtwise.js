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
  Button,
  Spinner,
  Alert,
  Nav,
  NavItem,
  NavLink,
  CardBody,
  Input,
  Media,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu, DropdownItem,
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

class ReportsDistrictwise extends React.Component {
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

    agent_id: null,
    pageSize: 10,
    activePage: 1,
    districtsByMonth: [],
    districtsByYear: [],
    districts: 'districtsByMonth',
    activeButtonDistrict: '1',


  };
  target = '';

  componentDidMount = async () => {
    const districtsByMonth = await Executive.getTopDistrictsByMonth();
    const districtsByYear = await Executive.getTopDistrictsByYear();
    if (districtsByMonth.success && districtsByYear.success) {
      this.setState({
        districtsByMonth: districtsByMonth.data,
        districtsByYear: districtsByYear.data,
        visible: false
      })
    }
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
                  <td><b>{item.district_name}</b></td>
                  <td>
                    <b>{item.total_revenue}</b>
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

    )
  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  };

  seeReports = (agent_id) => {
    this.props.history.push({
      pathname: '/executive/reports/view-reports',
      state: {agent_id: agent_id}
    })
  };

  onClick = (e) => {
    const button = e.target.value;
    if(button === '1'){
      this.props.history.push('/executive/reports/products')
    }else if (button === '2'){
      this.props.history.push('/executive/reports/districts')
    }else{
      this.props.history.push('/executive/reports/daily')
    }
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

  renderAgentwiseSales = () => {
    return (

      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">My Agents</h3>
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
                <Button size={'lg'} value={'1'} color={'secondary'}
                        onClick={this.onClick}>Productwise Sales</Button>
                <Button size={'lg'} value={'2'} color={'primary'}
                        onClick={this.onClick}>Districtwise Sales</Button>
                <Button size={'lg'} value={'3'} color={ 'secondary'}
                        onClick={this.onClick}>Daily Reports</Button>
            </span>
            </div>
          </Row>
          {/* Table */}
          <Row className={'mt-7'}>

          </Row>
          {/*pie graph*/}
          <Row className={'mt-5'}>
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Daily Reports
                      </h6>
                      <h2 className="text-white mb-0">Select an agent to see his/her reports</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  {this.renderTopSellingDistricts()}
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
)(ReportsDistrictwise);

