import React from "react";

// reactstrap components
import {Card, CardBody, CardTitle, Container, Row, Col, Button, Modal, ModalBody, Input, ModalFooter} from "reactstrap";
import {connect} from "react-redux";
import Executive from "../../models/Executive";
import {toast, ToastContainer} from "react-toastify";

class Header extends React.Component {
  state ={
    target: null,
    modal: false,
    targetVal: null,
  };

  componentDidMount = async () => {
    const res = await Executive.getMonthlyTarget();
    console.log(res,'TARGET')
    if(res.success){
      if(res.data.length === 0){
        toast.warn(` You haven't set a Monthly Target`,{
          autoClose:false,
          position:"bottom-left"
        });
      }else{
        this.setState({
          target: res.data[0].target_value
        })
      }
    }else{
      toast.error(` Something went wrong when getting Monthly target`,{
        autoClose:false,
        position:"bottom-left"
      });
    }

  };

  toggle = ()=> {
    this.setState({
      modal: !this.state.modal
    })
  };

  setTarget = async () => {
    const target_value = this.state.targetVal;
    if(!isNaN(target_value)){
      const res = await Executive.setTarget(target_value);
      console.log(res);
      if(res.success){
        this.setState({
          target: target_value,
        });
        this.toggle();
      }else{
        toast.error(` Something went wrong when setting Monthly target`,{
          autoClose:false,
          position:"bottom-left"
        });
      }
    }else{
      toast.warn(' Target should be a value')
    }

  };

  render() {
    const {modal} = this.state;
    const {toggle} = this.toggle;
    return (
      <>
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
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <div>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalBody>
                <Row>
                  <Col lg="6" xl="3">
                    <label
                      className="form-control-label"
                      htmlFor="target"
                    >
                      Target
                    </label>
                  </Col>
                  <Col lg="6" xl="9">
                    <Input
                      className="form-control-alternative"
                      id="target"
                      type="text"
                      required={true}
                      onChange ={(e)=>{this.setState({targetVal : e.target.value})}}
                    />
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.setTarget}>Set</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="6">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Monthly Target
                          </CardTitle>
                          {this.state.target === null ? <span className="h2 font-weight-bold mb-0">
                            No target is set for this month
                          </span> : <span className="h2 font-weight-bold mb-0">
                            {this.state.target}
                          </span>
                          }

                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-bullseye" />
                          </div>
                        </Col>
                      </Row>
                      {this.state.target === null ?
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <Button color="danger" size={'sm'} outline type="button" onClick={()=>{this.toggle()}}>
                            Set a target
                          </Button>
                        </p> : <p className="mt-3 mb-0 text-muted text-sm">
                          {' '}
                        </p>
                      }
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.AuthenticationReducer.user,
});

const bindAction = (dispatch) => ({});

export default connect(
  mapStateToProps,
  bindAction
)(Header);

