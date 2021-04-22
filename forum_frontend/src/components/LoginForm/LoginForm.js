import axios from "axios";
import React, { Component } from "react";
import {Button, Form, FormGroup, Input, Label } from "reactstrap";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleLogin = (event) => {
    event.preventDefault();

    const login = this.state.login;
    const password = this.state.password;

    const user = {
      login: login,
      password: password,
    };

    axios.post("http://localhost:8081/api/auth/signin", user).then(res => {
      console.log(res.data)
      localStorage.setItem("authorization", res.data.authenticationToken);
      return this.handleRedirect();
    })
  };

  handleRedirect(data) {
    if (localStorage.getItem("authorization") != null) {
      window.location.replace("/");
    } else {
      alert("Authentication error");
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="justify-content-center" style={{width:"50%", marginTop:"20%", marginLeft:"35%"}}>
          <h3 className="mb-5 mx-auto">Authorization</h3>
          <Form onSubmit={this.handleLogin}>
            <FormGroup>
              <Label>Login</Label>
              <Input className="mb-4" type="text" name="login" id="login" style={{width:"50%"}} onChange={this.handleChange}></Input>
              <Label>Password</Label>
              <Input className="mb-4" type="password" name="password" id="password" style={{width:"50%"}} onChange={this.handleChange}></Input>
              <Button
                type="submit"
                className="btn text-center"
                color="primary"
              >
                Login
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
