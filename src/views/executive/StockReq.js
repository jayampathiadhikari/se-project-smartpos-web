import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
  Button, Spinner, Alert
} from "reactstrap";
// core components

import Pagination from "react-js-pagination";
import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import Executive from "../../models/Executive";
import { ToastContainer, toast } from 'react-toastify';


class StockReq extends React.Component {
  state = {
    alert:'info',
    visible: true,
    processing:true,
    msg:null,

    agents:[],
    activePage: 1,
    activePageReq:1,
    pageSize: 5,
    invoiceData:[],
    invoiceTable:false
  };

  componentDidMount = async() => {
    const result = await Executive.getAllAgents();
    const res = await Executive.getAgentsWithRequests();
    if(res.data.success){
      const agents = this.filterData(result,res.data.data);
      this.setState({
        agents:agents,
        visible: false,
      })
    }
  };

  filterData = (filter, container) => {
    var agentsWithReq =  filter.filter(function(agent) {
      return container.includes(agent.uid);
    });
    return agentsWithReq;
  };

  onSeeRequests = async (id) => {
    const res = await Executive.getAgentRequests(id);
    if(res.data.success){
      this.setState({
        agentID:id,
        invoiceTable:true,
        invoiceData:res.data.data
      })
    }
  };

  renderTableRows = () => {
    const {pageSize, activePage} = this.state;
    const pagedArray = this.state.agents.slice(pageSize*(activePage-1),pageSize*activePage);
    return pagedArray.map((item,i) => (
        <tr key={i.toString()}>
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
          <td>
            {item.phoneNumber}
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
                  onClick={e => {e.preventDefault(); this.onSeeRequests(item.uid)}}
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

  onClickSend = async (prod_details) => {
    const {invoiceData,agentID} = this.state;
    const res = await Executive.sendRequest(agentID,prod_details.product_id,prod_details.quantity);
    if(res.data.success){
      toast.success(` ${prod_details.product_id} Sending Successful`,{toastId:prod_details.product_id});
      const index = invoiceData.indexOf(prod_details);
      const newInvoiceData = invoiceData;
      newInvoiceData.splice(index,1);
      if (index > -1) {
        this.setState({
          invoiceData: newInvoiceData
        })
      }
    }else{
      toast.error(` ${prod_details.product_id} Process Failed`,{
        toastId:prod_details.product_id,
        autoClose:false,
        position:"bottom-left"
      });
    }

  };

  onClickReject = async(prod_details) => {
    const {invoiceData} = this.state;
    const res = await Executive.rejectRequest(prod_details.requesting_invoice_items_id);
    console.log(res);
    if(res.data.success){
      toast.warn(` Request Rejected Successfully`,{toastId:prod_details.product_id});
      const index = invoiceData.indexOf(prod_details);
      const newInvoiceData = invoiceData;
      newInvoiceData.splice(index,1);
      if (index > -1) {
        this.setState({
          invoiceData: newInvoiceData
        })
      }
    }else{
      toast.error(` ${prod_details.product_id} Process Failed`,{
        toastId:prod_details.product_id,
        autoClose:false,
        position:"bottom-left"
      });
    }

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
    const {pageSize, activePageReq, invoiceData} = this.state;
    const pagedArray = invoiceData.slice(pageSize*(activePageReq-1),pageSize*activePageReq);
    return pagedArray.map((item,i) => (
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
          <td>{item.quantity}</td>
          <td>
            {item.available_qantity}
          </td>
          <td className="text-right">
            <Button color="danger" size={'md'} outline type="button" onClick={()=>{this.onClickReject(item)}}>
              Reject
            </Button>
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
              <h3 className="text-white mb-0">Request List</h3>
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
              <div className="pagination justify-content-end mb-0">
                <Pagination
                  activePage={this.state.activePageReq}
                  itemsCountPerPage={5}
                  totalItemsCount={this.state.invoiceData.length}
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
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover/>
          <Alert color={this.state.alert} isOpen={this.state.visible} style={{position:'fixed',left:'50%',top:'50%',zIndex:999}}>
            {this.state.processing ? <Spinner style={{ width: '3rem', height: '3rem' }} /> : this.state.msg}
          </Alert>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Request Invoice</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">District</th>
                    <th scope="col">Contact</th>
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
          {this.state.invoiceTable ? this.renderInvoiceTable() : null}
        </Container>
      </>
    );
  }
}

export default StockReq;
