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
import axios from 'axios';

// reactstrap components
import { Container, Row, Col } from "reactstrap";

class UserHeader extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
            profile: [],
            first_name:'',
            employee_id:'',

            //amount: ''
        }
    }

  componentDidMount() {
      console.log("rezult")
      axios.get(`https://se-smartpos-backend.herokuapp.com/employee/profile`).then((result) => {
          console.log("result data", result.data.first_name)
          this.setState({
              profile: result.data

          })
      })
  }



  render() {
    var {profile} =this.state
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("assets/img/theme/addUser.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}

          {profile && (profile).map((profileObj) => {

                                  return (<div>
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">Hello {profileObj.first_name}</h1>
                <p className="text-white mt-0 mb-5">
                  This is your profile page. You can see the progress you've
                  made with your work and manage your projects or assigned tasks
                </p>

              </Col>
            </Row>
          </Container>
          </div>
)})}
        </div>
      </>
    );
  }
}

export default UserHeader;
