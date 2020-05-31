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
  Table,
  Container,
  Row,
  UncontrolledTooltip, Button, Alert, Spinner
} from "reactstrap";
// core components

import Pagination from "react-js-pagination";
import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import Agent from '../../models/Agent'

import {connect} from "react-redux";
import {toast, ToastContainer} from "react-toastify";


// employee_id: "vsotjU8PuSUm5HxEmDbJ5zWvbgy2"
// name: "noodles"
// product_id: "3"
// production_cost: 180
// quantity: 80
// requesting_invoice_items_id: 3
// selling_price: 200
// state_accepted: "false"


class RequestStock extends React.Component {
  state = {
    alert:'info',
    visible: true,
    processing:true,
    msg:null,

    agent_id: null,
    activePage: 1,
    activePageReq:1,
    pageSize: 5,
    data:[]

  };

  componentDidMount =async () => {
    const res = await Agent.viewSuggestedList(this.props.user.uid);
    if(res.data.success){
      if(res.data.data.length === 0 ){
        toast.warn(` No new requests`,{
          autoClose:false,
          position:"bottom-left"
        });
      }
      this.setState({
        data:res.data.data,
        visible: false
      })
    }else{
      this.setState({
        visible: false
      });
      toast.error(` Something went wrong`,{
        autoClose:false,
        position:"bottom-left"
      });
    }

  };

  onClickSend = async(prod_details) => {
    const res = await Agent.acceptSuggestion(prod_details.requesting_invoice_items_id);
    if(res.data.success){
      toast.success(` Request sent successfully`);
      const res = await Agent.viewSuggestedList(this.props.user.uid);
      if(res.data.success){
        this.setState({
          data:res.data.data
        })
      }
    }else{
      toast.error(` Something went wrong`,{
        autoClose:false,
        position:"bottom-left"
      });
    }
  };

  onClickDecline = async (prod_details) => {
    const res = await Agent.declineSuggestion(prod_details.requesting_invoice_items_id);
    if(res.data.success){
      const res = await Agent.viewSuggestedList(this.props.user.uid);
      if(res.data.success){
        toast.warn(` Request declined `);
        this.setState({
          data:res.data.data
        })
      }else{
        toast.error(` Something went wrong`,{
          autoClose:false,
          position:"bottom-left"
        });
      }
    }
  };

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  handlePageChangeInvoiceTable(pageNumber) {
    this.setState({activePageReq: pageNumber});
  }

  renderInvoiceTableRows = () => {
    const {pageSize, activePageReq,data} = this.state;
    const pagedArray = data.slice(pageSize*(activePageReq-1),pageSize*activePageReq);
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
          <td>{item.name}</td>
          <td>
            {item.quantity}
          </td>
          <td className="text-right">
            <Button color="danger" size={'md'} outline type="button" onClick={()=>{this.onClickDecline(item)}}>
              Decline
            </Button>
            <Button color="primary" size={'md'} onClick={()=>{this.onClickSend(item)}}>
              Request
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
              <h3 className="text-white mb-0">Products List</h3>
            </CardHeader>
            <Table className="align-items-center table-dark table-flush" responsive>
              <thead className="thead-dark">
              <tr>
                <th scope="col">Product ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Required Amount</th>
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
          <ToastContainer
            position="top-right"
            autoClose={10000}
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
          {this.state.data.length > 0 ? this.renderInvoiceTable() : null}
        </Container>
      </>
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.AuthenticationReducer.user,
});

const bindAction = () => ({
});

export default connect(
  mapStateToProps,
  bindAction
)(RequestStock);