import React from "react";
import {
  withRouter
} from "react-router-dom";

// reactstrap components
import {
  Card,
  CardBody,
  CardFooter,
  Row,
  Col,
} from "reactstrap";



class PageNotFound extends React.Component {

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0 ">
            <CardBody className="px-lg-5">
              <div className="text-center text-muted" style={{fontSize:58}}>
                ERROR
              </div>
              <div className="text-center text-muted" style={{fontSize:124}}>
                404
              </div>
              <div className="text-center text-muted" style={{fontSize:32}}>
                Page not found
              </div>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
          <Row className="mt-3">
          </Row>
        </Col>
      </>
    );
  }
}



export default withRouter(PageNotFound);


