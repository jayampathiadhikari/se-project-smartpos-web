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
  CardBody,
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



class ReportsAgentwise extends React.Component {

  state = {
    alert:'info',
    visible: true,
    processing:true,
    msg:null,

    agent_id: null,
    pageSize: 10,
    activePage: 1,

    agentData: [],

  };
  target = '';

  componentDidMount = async () => {
    const res = await Executive.getAllAgents();
    this.setState({
      agentData: res,
      visible: false
    });
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
                <Button size={'lg'} value={'2'} color={'secondary'}
                        onClick={this.onClick}>Districtwise Sales</Button>
                <Button size={'lg'} value={'3'} color={ 'primary'}
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
                  {this.renderAgentwiseSales()}
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
)(ReportsAgentwise);

