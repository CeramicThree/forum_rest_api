import { Button } from "reactstrap";
import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

class AppNav extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
  }

  handleLogin() {
    window.location.replace("/login");
  }

  handleProfile() {
    window.location.replace("/profile");
  }

  componentDidMount() {
    if (localStorage.getItem("authorization") == null) {
      this.setState({
        isLoggedIn: false,
      });
    } else {
      this.setState({
        isLoggedIn: true,
      });
    }
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = (
        <Button color="primary" onClick={this.handleProfile}>
          Profile
        </Button>
      );
    } else {
      button = (
        <Button color="primary" onClick={this.handleLogin}>
          Login
        </Button>
      );
    }

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Forum</NavbarBrand>
          <Collapse navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Posts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Hot</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          {button}
        </Navbar>
      </div>
    );
  }
}

export default AppNav;
