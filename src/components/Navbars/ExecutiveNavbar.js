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
import {setExecutiveLogin} from "../../redux/reducers/authentication/action";
import {connect} from "react-redux";

class ExecutiveNavbar extends React.Component {

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
    console.log('SIGN OUT');
    this.props.setLogin(false);
  };

  render() {
    var {profile} = this.state;
    if (this.props.location.pathname === '/executive/maps') {
      return (null)
    } else {
      return (
        <>
          <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
            <Container fluid>
              <Link
                className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                to="/"
              >
                {this.props.brandText}
              </Link>

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
                    <DropdownItem to="/executive/owner-profile" tag={Link}>
                      <i className="ni ni-single-02"/>
                      <span>My profile</span>
                    </DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem href="/auth" onClick={this.onSignOut}>
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
  setLogin: (status) => dispatch(setExecutiveLogin(status)),
});

export default connect(
  mapStateToProps,
  bindAction
)(ExecutiveNavbar);

