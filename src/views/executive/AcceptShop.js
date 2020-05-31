import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Media,
  Table,
  Container,
  Row,
  Button
} from "reactstrap";
// core components

import Pagination from "react-js-pagination";
import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import Executive from "../../models/Executive";


class AcceptShop extends React.Component {
  state = {
    data:[],
    activePage: 1,
    activePageReq:1,
    pageSize: 5
  };

  onSeeRequests = (id) => {
    console.log(id);
  };

  componentDidMount = async () => {
    await this.getShops()
  };

  getShops = async () => {
    const res = await Executive.getShopSuggestion();
    if(res.data.success){
      this.setState({
        data:res.data.data
      });
      console.log(res.data.data)
    }
  };

  onClickAccept = async (prod_details) => {
    const res = await Executive.acceptShopSuggestion(prod_details.shop_suggestion_id);
    if(res.data.success){
      await this.getShops()
    }
    console.log(res)
  };
  onClickReject = async (prod_details) => {
    const res = await Executive.rejectShopSuggestion(prod_details.shop_suggestion_id);
    if(res.data.success){
      await this.getShops()
    }
    console.log(res)
  };
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  handlePageChangeInvoiceTable(pageNumber) {
    console.log(`active page invoice table is ${pageNumber}`);
    this.setState({activePageReq: pageNumber});
  }

  renderInvoiceTableRows = () => {
    const {pageSize, activePageReq, data} = this.state;
    const pagedArray = data.slice(pageSize*(activePageReq-1),pageSize*activePageReq);
    return pagedArray.map((item,i) => (
        <tr key={i.toString()}>
          <th scope="row">
            <Media className="align-items-center">
              <Media>
                <span className="mb-0 text-sm">
                  {item.name}
                </span>
              </Media>
            </Media>
          </th>
          <td>{item.name}</td>
          <td>
            {item.name_with_initial}
          </td>
          <td>
            {item.contact_num_cell}
          </td>
          <td>
            {item.email}
          </td>
          <td className="text-right">
            <Button color="danger" size={'md'} outline type="button" onClick={()=>{this.onClickReject(item)}}>
              Reject
            </Button>
            <Button color="primary" size={'md'} onClick={()=>{this.onClickAccept(item)}}>
              Accept
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
              <h3 className="text-white mb-0">Suggestions List</h3>
            </CardHeader>
            <Table className="align-items-center table-dark table-flush" responsive>
              <thead className="thead-dark">
              <tr>
                <th scope="col">Shop Name</th>
                <th scope="col">Shop Contact</th>
                <th scope="col">District</th>
                <th scope="col">Owner</th>
                <th scope="col">Owner Contact</th>
                <th scope="col">Email</th>
                <th scope="col"/>
              </tr>
              </thead>
              <tbody>
              {this.renderInvoiceTableRows()}
              </tbody>
            </Table>
            <CardFooter className="py-4 bg-transparent border-0">
              <div className="pagination justify-content-end mb-0">
                <Pagination
                  activePage={this.state.activePageReq}
                  itemsCountPerPage={5}
                  totalItemsCount={this.state.data.length}
                  pageRangeDisplayed={3}
                  onChange={this.handlePageChangeInvoiceTable.bind(this)}
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

  render() {
    return (
      <>
        <HeaderNoCards/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          {this.renderInvoiceTable()}
        </Container>
      </>
    );
  }
}

export default AcceptShop;
