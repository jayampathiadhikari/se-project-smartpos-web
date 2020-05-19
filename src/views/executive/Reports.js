/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
  Button, Col, FormGroup, Input, Table, Media, Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
// core components

import HeaderNoCards from "../../components/Headers/HeaderNoCards";

import {data} from "./MyAgents";
import Pagination from "react-js-pagination";

//id,name,prod cost, selling price,, quantity

class ExecReports extends React.Component {
  state = {
    agent_id: null,
    current_data: [],
    pageSize: 5,
    activePage:1
  };

  seeReports = (agent_id) => {
    this.props.history.push({
      pathname: '/executive/reports/view-reports',
      state: {agent_id:agent_id}
    })
  };

  renderTableRows = () => {
    const {pageSize, activePage} = this.state;
    const pagedArray = data.slice(pageSize*(activePage-1),pageSize*activePage);
    return pagedArray.map((item) => (
        <tr>
          <th scope="row">
            <Media className="align-items-center">
              <Media>
                <span className="mb-0 text-sm">
                  {item.name}
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
                  onClick={e => {e.preventDefault(); this.seeReports(item.id)}}
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
                      totalItemsCount={data.length}
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
