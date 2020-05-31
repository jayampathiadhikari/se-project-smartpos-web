import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Media,
  Table,
  Container,
  Row, Spinner, Alert,
} from "reactstrap";
// core components
import Pagination from "react-js-pagination";

import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import executive from "../../models/Executive";


class MyAgents extends React.Component {
  state = {
    alert:'info',
    visible: true,
    processing:true,
    msg:null,

    agent_id: null,
    current_data: [],
    pageSize: 5,
    activePage:1,
    agents:[]
  };

  componentDidMount= async () => {
    const res =  await executive.getAllAgents();
    console.log(res)
    this.setState({
      agents:res,
      visible: false,
    })
  };

  onSeeRequests = (id) => {
    console.log(id);
  };

  renderTableRows = () => {
    const {pageSize, activePage,agents} = this.state;
    const pagedArray = agents.slice(pageSize*(activePage-1),pageSize*activePage);
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
          <td>{item.lastName}</td>
          <td>{item.region}</td>
          <td>{item.phoneNumber}</td>
          <td>{item.address}</td>
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
          <Alert color={this.state.alert} isOpen={this.state.visible} style={{position:'fixed',left:'50%',top:'50%',zIndex:999}}>
            {this.state.processing ? <Spinner style={{ width: '3rem', height: '3rem' }} /> : this.state.msg}
          </Alert>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Agents Info</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">District</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Address</th>
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
                      totalItemsCount={this.state.agents.length}
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

export default MyAgents;
