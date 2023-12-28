import React, { Component,Fragment } from 'react';
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import { Connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { connect } from 'mongoose';
import PropTypes from 'prop-types;'
class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  };

  static propTypes = {
    auth : PropTypes.object.isRequired
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const{isAuthenticated, user} = this.props.auth;
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>
              {user ? "welcom ${user.name}":'' }
            </strong>
          </span>
        </NavItem>
        <NavItem><Logout/></NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
            <RegisterModal />
        </NavItem>
        <NavItem><LoginModal/></NavItem>
      </Fragment>
    )

    return (
      <div>
        <Container>
          <NavbarBrand href='/'>ShoppingList</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              { isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state =>({
  auth: state.auth
});


export default connect(mapStateToProps,null)(AppNavbar);
