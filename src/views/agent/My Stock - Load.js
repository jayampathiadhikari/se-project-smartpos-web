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
  Col,
  UncontrolledTooltip, Button, Input
} from "reactstrap";
// core components
import Datepicker from "../../components/DateTime";
import Pagination from "react-js-pagination";
import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import CustomDropdown from "../../components/Dropdown";
import Agent from "../../models/Agent";
import {connect} from "react-redux";
import {getSalespersonByAgent} from "../../Utils";

const salesperson =  [
  {
    id: 'sp01',
    name: 'SP1',
  },
  {
    id: 'item002',
    name: 'SP2',
  },

];

class MyStockLoad extends React.Component {
  state = {
    agent_id: null,
    activePage : 1,
    initialData:[],
    pageSize:5,
    data: [],
    salesperson:[],
    loadAmount:null,
    salesperson_id:null
  };

  componentDidMount = async() => {
    const uid = this.props.user.uid;
    const result = await getSalespersonByAgent(uid);
    const res = await Agent.getStock(uid);
    if(res.data.success){
      this.setState({
        initialData:res.data.data,
        data:res.data.data,
        salesperson:result
      })
    }
  };

  onClick = async (product) => {
    if(this.state.salesperson_id){
      const res = await Agent.addStockToSalesperson(this.state.salesperson_id,product.product_id,this.state.loadAmount);
      console.log(res);
      if(res.success){
        const uid = this.props.user.uid;
        const res = await Agent.getStock(uid);
        if(res.data.success){
          this.setState({
            initialData:res.data.data,
            data:res.data.data,
          })
        }
      }
      console.log(res)
    }else{
      alert('SELECT SP')
    }

  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  onChange = (e) => {
    this.setState({
      loadAmount:e.target.value
    })
  };

  renderTableRows = () => {
    const {pageSize, activePage,data} = this.state;
    const pagedArray = data.slice(pageSize*(activePage-1),pageSize*activePage);
    return pagedArray.map((item,index) => (
        <tr key={index.toString()}>
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
              id={item.product_id}
              type="text"
              required={true}
              style={{maxWidth:90}}
              onChange = {this.onChange}
            />
          </td>
          <td className="text-right">
            <Button color="primary" size={'md'} onClick={()=>{this.onClick(item)}}>
              Load
            </Button>
          </td>
        </tr>
      )
    )
  };

  filter = (e) => {
    const filteredArray = this.state.initialData.filter(
      data => {return (data.name.toLowerCase().includes(e.target.value.toLowerCase())) }
    );
    this.setState({
      data:filteredArray
    });
  };

  onSelect = (sp) => {
    this.setState({
      salesperson_id: sp.id
    });
    console.log(sp.name,sp.id)
  };

  render() {
    return (
      <>
        <HeaderNoCards/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <CustomDropdown data = {this.state.salesperson} initial={"SELECT SALESPERSON"} onSelect={this.onSelect}/>
            </div>

          </Row>
          {/* Table */}
          <Row className={"mt-7"}>
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <Row>
                    <Col lg={7}>
                      <h3 className="text-white mb-0">My Stock</h3>
                    </Col>
                    <Col lg={5}>
                      <div>
                        <Input
                          className="form-control-alternative"
                          id="firstName"
                          type="text"
                          placeholder={"Filter by product name..."}
                          autoComplete = "false"
                          onChange = {this.filter}
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
                    <th scope="col">Load Amount</th>
                    <th scope="col"/>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderTableRows()}
                  </tbody>
                </Table>
                <CardFooter className="py-4 bg-transparent border-0">
                  <div className="pagination justify-content-end mb-0">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={5}
                      totalItemsCount={this.state.initialData.length}
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

const mapStateToProps = (state) => ({
  user: state.AuthenticationReducer.user,
});

const bindAction = () => ({
});

export default connect(
  mapStateToProps,
  bindAction
)(MyStockLoad);

