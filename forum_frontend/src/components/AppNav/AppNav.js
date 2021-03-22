import { Button } from 'reactstrap';
import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class AppNav extends Component{
    render(){
        return(
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
            <Button color="primary">Login</Button>
          </Navbar>
        </div>
      );
    }
}

export default AppNav;