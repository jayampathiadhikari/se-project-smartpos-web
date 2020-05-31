import React from "react";

import {Link} from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";
import {setAgentLogin} from "../../redux/reducers/authentication/action";
import {connect} from "react-redux";

class AgentNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      first_name: '',
      employee_id: '',
      count: ''
    }
  }


  onSignOut = () => {
    console.log('SIGN OUT')
    this.props.setLogin(false);
  };

  render() {
    var {profile} = this.state;
    if (this.props.location.pathname === '/agent/maps') {
      return (null)
    } else {
      return (
        <>
          <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
            <Container fluid>
              <div
                className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              >
                {this.props.brandText}
              </div>
              <Nav className="align-items-center d-none d-md-flex" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle className="pr-0" nav>
                    <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/team-1-800x800.jpg")}
                      />
                    </span>
                      {profile && (profile).map((profileObj) => {

                        return (<div>
                            <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {this.props.user.firstName} {this.props.user.lastName}
                      </span>
                            </Media>
                          </div>
                        )
                      })}
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </DropdownItem>
                    <DropdownItem to="/admin/agent-profile" tag={Link}>
                      <i className="ni ni-single-02"/>
                      <span>My profile</span>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-settings-gear-65"/>
                      <span>Settings</span>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-calendar-grid-58"/>
                      <span>Activity</span>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-support-16"/>
                      <span>Support</span>
                    </DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem href="/login" onClick={this.onSignOut}>
                      <i className="ni ni-user-run"/>
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>

            </Container>
          </Navbar>


        </>
      );
    }

  }
}

const mapStateToProps = (state) => ({
  user: state.AuthenticationReducer.user,
});

const bindAction = (dispatch) => ({
  setLogin: (status) => dispatch(setAgentLogin(status)),
});

export default connect(
  mapStateToProps,
  bindAction
)(AgentNavbar);

