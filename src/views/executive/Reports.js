import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Col, Table, Media, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Nav, NavItem, NavLink, Button
} from "reactstrap";
// core components

import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import Pagination from "react-js-pagination";
import Executive from "../../models/Executive";
import classnames from "classnames";

//id,name,prod cost, selling price,, quantity

class ExecReports extends React.Component {
  state = {
    agent_id: null,
    agentData: [],
    pageSize: 5,
    activePage:1,
    activeButton : '1',
  };

  componentDidMount = async() =>{
    const res = await Executive.getAllAgents()
    this.setState({
      agentData: res
    });
    console.log(res)
  };

  seeReports = (agent_id) => {
    this.props.history.push({
      pathname: '/executive/reports/view-reports',
      state: {agent_id:agent_id}
    })
  };

  renderTableRows = () => {
    const {pageSize, activePage, agentData} = this.state;
    const pagedArray = agentData.slice(pageSize*(activePage-1),pageSize*activePage);
    return pagedArray.map((item,index) => (
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
                  onClick={e => {e.preventDefault(); this.seeReports(item.uid)}}
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

  onClick = (e) => {
    console.log(typeof e.target.value)
    this.setState({
      activeButton : e.target.value
    })
  };
  render() {
    return (
      <>
        <HeaderNoCards/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <span>
                <Button size={'lg'} value={'1'} color={this.state.activeButton === '1' ? 'primary' : 'secondary'} onClick={this.onClick}>Agentwise Sales</Button>
                <Button size={'lg'} value={'2'} color={this.state.activeButton === '2' ? 'primary' : 'secondary'} onClick={this.onClick}>Top Selling Products</Button>
                <Button size={'lg'} value={'3'} color={this.state.activeButton === '3' ? 'primary' : 'secondary'} onClick={this.onClick}>Top Selling Districts</Button>
            </span>
            </div>
          </Row>
          {/* Table */}
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            </Col>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Reports</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                  <tr >
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
        </Container>
      </>
    );
  }
}

export default ExecReports;
