import axios from "axios";
import React, { Component } from "react";
import { Spinner} from "reactstrap";
import AppNav from "../AppNav/AppNav";

class SinglePost extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      post: "",
    };
  }

  async componentDidMount() {
    const {
      match: { params },
    } = this.props;
    await axios
      .get('/api/posts/' + params.ident)
      .then(({data: post}) => {
        this.setState({
          isLoading: false,
          post: post,
        });
        console.log(this.state.post);
      });
  }

  render() {
    const { isLoading, post } = this.state;

    if (isLoading) {
      return (
        <div>
          <AppNav />
          <div className="container mt-5">
            <Spinner color="primary" />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <AppNav />
          <div className="container mt-5" style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <p>Created by: {post.user.login}</p>
            <h2 >{post.header}</h2>
            <p className="mt-3">{post.text}</p>
            <p>{post.fullText}</p>
          </div>
        </div>
      );
    }
  }
}

export default SinglePost;
