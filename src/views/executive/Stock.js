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
  Col,
  Button, Input
} from "reactstrap";
// core components
import Pagination from "react-js-pagination";
import HeaderNoCards from "../../components/Headers/HeaderNoCards";
import Executive from "../../models/Executive";



class Stock extends React.Component {
  state = {
    agent_id: null,
    activePage : 1,
    initialData:[],
    pageSize:5,
    data: []
  };

  componentDidMount = async () =>{
    const res = await Executive.getStock();
    console.log(res);
    if(res.success){
      this.setState({
        initialData:res.data,
        data:res.data
      })
    }
    else {
      this.setState({
        initialData:[],
        data:[]
      })
    }
  };

  onClick = (product) => {
    this.props.history.push({
      pathname: '/executive/my-stock/add-to-warehouse',
      state: {product:product}
    })
  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  renderTableRows = () => {
    const {pageSize, activePage, data} = this.state;
    const pagedArray = data.slice(pageSize*(activePage-1),pageSize*activePage);
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
          <td>{item.quantity}</td>
          <td>{item.production_cost}</td>
          <td>{item.selling_price}</td>
          <td className="text-right">
            <Button color="primary" size={'md'} onClick={()=>{this.onClick(item)}}>
              +
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

  render() {
    return (
      <>
        <HeaderNoCards/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <span>
                <Button size={'lg'} onClick={()=>{this.props.history.push('/executive/my-stock/add-new-product')}}>Add New Product</Button>
                <Button size={'lg'} onClick={()=>{this.props.history.push('/executive/my-stock/send-to-agent')}}>Send To Agent</Button>
            </span>
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
                    <th scope="col">Quantity</th>
                    <th scope="col">Production Cost</th>
                    <th scope="col">Selling Price</th>
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
                      totalItemsCount={this.state.data.length}
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

export default Stock;
