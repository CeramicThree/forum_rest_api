import React, { Component } from "react";
import { FormGroup, Label, Input, Button, Form } from "reactstrap";
import AppNav from "../AppNav/AppNav";
import jwt_decode from "jwt-decode";
import axios from "axios";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      header: "",
      text: "",
      createdDate: new Date(),
      user: {
        id: "",
        email: "",
        login: "",
        password: "",
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchUserByLogin = this.fetchUserByLogin.bind(this);
  }

  componentDidMount() {
    this.fetchUserByLogin();
  }

  handleSubmit(event) {
    console.log(this.state.user);
    const date = Date.now();
    this.setState({
      createdDate: date,
    });
    axios
      .post("http://localhost:8081/api/posts/", this.state, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authorization"),
        },
      })
      .then(() => {
        console.log(this.state.user);
        window.location.replace("/");
      });
    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getUsernameFromJwt() {
    var token = localStorage.getItem("authorization");
    var decoded = jwt_decode(token);
    return decoded.sub;
  }

  async fetchUserByLogin() {
    await axios
      .get("http://localhost:8081/api/users/" + this.getUsernameFromJwt(), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authorization"),
        },
      })
      .then((result) => {
        this.setState({
          user: {
            id: result.data.id,
            email: result.data.email,
            login: result.data.login,
            password: result.data.password,
          },
        });
      });
  }

  render() {
    return (
      <div>
        <AppNav />
        <div className="container mt-4" style={{ width: "35%" }}>
          <h3 className="text-center mb-4">Adding post</h3>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label tag="h5" for="imageUrl">
                Image URL
              </Label>
              <Input
                type="text"
                name="imageUrl"
                id="imageUrl"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label tag="h5" for="header">
                Header
              </Label>
              <Input
                type="text"
                name="header"
                id="header"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label tag="h5" for="text">
                Text
              </Label>
              <Input
                type="textarea"
                name="text"
                id="text"
                style={{ height: "25vh" }}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button
              type="submit"
              className="btn-lg btn-lg-success text-center"
              color="success"
            >
              Add
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default AddPost;
