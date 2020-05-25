import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Col, Table, Media, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Input
} from "reactstrap";
// core components

import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import Pagination from "react-js-pagination";
import Executive from "../../models/Executive";

//id,name,prod cost, selling price,, quantity

class StockSendToAgent extends React.Component {
  state = {
    agentID: null,
    agentName: null,
    agentData: [],
    pageSize: 5,
    activePage: 1,
    activePageStock: 1,
    data: [],
    initialData: [],
    amount: null,
    filter: null
  };

  componentDidMount = async () => {
    const res = await Executive.getAllAgents();
    this.setState({
      agentData: res
    });
    console.log(res)
  };

  seeStock = async (agent_id, agent_name) => {
    const res = await Executive.getStock();
    if (res.success) {
      this.setState({
        agentID: agent_id,
        agentName: agent_name,
        initialData: res.data,
        data: res.data
      })
    } else {
      this.setState({
        initialData: [],
        data: []
      })
    }
  };

  onClick = async (item) => {
    const {agentID, amount} = this.state;
    if (item.quantity >= amount) {
      const res = await Executive.sendStock(agentID, item.product_id, amount);
      if (res.data.success) {
        const res = await Executive.getStock();
        if (res.success) {
          if(this.state.filter){
            const filteredArray = this.state.initialData.filter(
              data => {
                return (data.name.toLowerCase().includes(this.state.filter))
              }
            );
            this.setState({
              initialData: res.data,
              data:filteredArray
            })
          }else{
            this.setState({
              initialData: res.data,
              data:res.data
            })
          }

        }

      }
      console.log(res);
    } else {
      alert('NO STOCK')
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
                    this.seeStock(item.uid, item.firstName)
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

  onChange = (e) => {
    this.setState({
      amount: e.target.value
    })
  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  handleStockPageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePageStock: pageNumber});
  }

  renderStockTableRows = () => {
    const {pageSize, activePageStock, data} = this.state;
    const pagedArray = data.slice(pageSize * (activePageStock - 1), pageSize * activePageStock);
    return pagedArray.map((item, i) => (
        <tr key={i.toString()}>
          <th scope="row">
            <Media className="align-items-center">
              <Media>
                <span className="mb-0 text-sm">
                  {item.product_id}
                </span>
              </Media>
            </Media>
          </th>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>
            <Input
              className="form-control-alternative"
              style={{maxWidth: 100}}
              type="text"
              autoComplete="false"
              onChange={this.onChange}
            /></td>

          <td className="text-right">
            <Button color="primary" size={'md'} onClick={() => {
              this.onClick(item)
            }}>
              Send
            </Button>
          </td>
        </tr>
      )
    )
  };
  filter = (e) => {
    const filteredArray = this.state.initialData.filter(
      data => {
        return (data.name.toLowerCase().includes(e.target.value.toLowerCase()))
      }
    );
    this.setState({
      filter: e.target.value.toLowerCase(),
      data: filteredArray
    });
  };

  renderStockTable = () => (
    <Row className={"mt-5"}>
      <div className="col">
        <Card className="bg-default shadow">
          <CardHeader className="bg-transparent border-0">
            <Row>
              <Col lg={7}>
                <h3 className="text-white mb-0">My Stock : Selected Agent - {this.state.agentName}</h3>
              </Col>
              <Col lg={5}>
                <div>
                  <Input
                    className="form-control-alternative"
                    id="firstName"
                    type="text"
                    placeholder={"Filter by product name..."}
                    autoComplete="false"
                    onChange={this.filter}
                  />
                </div>
              </Col>
            </Row>
          </CardHeader>
          <Table className="align-items-center table-dark table-flush" responsive>
            <thead className="thead-dark">
            <tr>
              <th scope="col">Product ID</th>
              <th scope="col">Name</th>
              <th scope="col">In Stock</th>
              <th scope="col">Amount to Send</th>
              <th scope="col"/>
            </tr>
            </thead>
            <tbody>
            {this.renderStockTableRows()}
            </tbody>
          </Table>
          <CardFooter className="py-4 bg-transparent border-0">
            <div className="pagination justify-content-end mb-0">
              <Pagination
                activePage={this.state.activePageStock}
                itemsCountPerPage={5}
                totalItemsCount={this.state.data.length}
                pageRangeDisplayed={3}
                onChange={this.handleStockPageChange.bind(this)}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </CardFooter>
        </Card>
      </div>
    </Row>

  )

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
                  <h3 className="mb-0">Select Agent</h3>
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
          {this.state.agentID ? this.renderStockTable() : null}
        </Container>
      </>
    );
  }
}

export default StockSendToAgent;
