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
import {signOut} from "../../redux/reducers/authentication/action";
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
    this.props.signOut();
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
                    <span >
                      <img
                        alt="..."
                        src={require("assets/img/theme/user3.png")}
                        style={{width:50, height:50}}
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
  signOut : () => dispatch(signOut())
});

export default connect(
  mapStateToProps,
  bindAction
)(ExecutiveNavbar);

