import React, { Component } from "react";
import { Button } from "reactstrap";

class Profile extends Component {
  constructor() {
    super();
    
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  handleLogout(){
    localStorage.removeItem('authorization');
    window.location.replace('/')
  }

  render() {
      return(
        <div>
            <Button
                onClick={this.handleLogout}
            >
                Logout
            </Button>
        </div>
      )
  }
}

export default Profile;
