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
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip, Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import CustomDropdown from "../../components/Dropdown";


const data = [
  {
  name: 'agent1',
  region: 'kegalle',
  id: 'agent1_id'
},
  {
    name: 'agent1',
    region: 'kegalle',
    id: 'agent1_id'
  },
];

const reqData = [
  {
    product_name:'Mari',
    request_amount:500,
    in_stock:1000,
  },
  {
    product_name:'Mari',
    request_amount:500,
    in_stock:1000,
  }
];

class StockReq extends React.Component {
  state = {
    agent_id: null
  };

  onSeeRequests = (id) => {
    console.log(id);
  };

  renderTableRows = () => {
    return data.map((item) => (
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
          <td>
            <Badge color="" className="badge-dot mr-4">
              <i className="bg-warning"/>
              pending
            </Badge>
          </td>
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
                  onClick={e => {e.preventDefault(); this.onSeeRequests(item.id)}}
                >
                  See Requests
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
      )
    )
  };

  onClickSend = (prod_details) => {
    console.log(prod_details);
  };

  renderInvoiceTableRows = () => {
    return reqData.map((item) => (
        <tr>
          <th scope="row">
            <Media className="align-items-center">
              <Media>
                <span className="mb-0 text-sm">
                  {item.product_name}
                </span>
              </Media>
            </Media>
          </th>
          <td>{item.request_amount}</td>
          <td>
            {item.in_stock}
          </td>
          <td className="text-right">
            <Button color="primary" size={'md'} onClick={()=>{this.onClickSend(item)}}>
              Send
            </Button>
          </td>
        </tr>
      )
    )
  };

  renderInvoiceTable = () => {
    return(
      <Row className="mt-5">
        <div className="col">
          <Card className="bg-default shadow">
            <CardHeader className="bg-transparent border-0">
              <h3 className="text-white mb-0">Agents List</h3>
            </CardHeader>
            <Table className="align-items-center table-dark table-flush" responsive>
              <thead className="thead-dark">
              <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Required Amount</th>
                <th scope="col">Amount In Stock</th>
                <th scope="col"/>
              </tr>
              </thead>
              <tbody>
              {this.renderInvoiceTableRows()}
              </tbody>
            </Table>
            <CardFooter className="py-4 bg-transparent border-0">
              
            </CardFooter>
          </Card>
        </div>
      </Row>
    )
  };

  render() {
    return (
      <>
        <HeaderNoCards/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Agents List</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">District</th>
                    <th scope="col">Status</th>
                    <th scope="col"/>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderTableRows()}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                </CardFooter>
              </Card>
            </div>
          </Row>
          {this.renderInvoiceTable()}
        </Container>
      </>
    );
  }
}

export default StockReq;
