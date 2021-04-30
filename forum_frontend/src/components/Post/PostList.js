import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import AppNav from "../AppNav/AppNav";
import Post from "./Post";

class PostList extends Component {
  state = {
    posts: [],
    isLoading: true,
    isLoggedIn: false,
  };

  async componentDidMount() {
    if (localStorage.getItem("authorization") == null) {
      this.setState({
        isLoggedIn: false,
      });
    } else {
      this.setState({
        isLoggedIn: true,
      });
    }
    const response = await fetch("/api/posts");
    const body = await response.json();
    this.setState({
      posts: body,
      isLoading: false,
    });
  }

  render() {
    const { posts, isLoading } = this.state;
    let addPost;
    if (this.state.isLoggedIn) {
      addPost = (
        <Link
          to="/addPost"
          className="btn btn-success mt-4"
          style={{
            float: "right",
            display: "inline-block",
            marginRight: "14vh",
          }}
          replace
        >
          + Add Post
        </Link>
      );
    }else{
      addPost = null;
    }
    if (isLoading)
      return (
        <div>
          <AppNav />
          <div className="container">
            <h2 className="mt-4" style={{ display: "inline-block" }}>
              Posts
            </h2>
            {addPost}
            <div className="mt-4">
              <Spinner color="primary"/>
            </div>
          </div>
        </div>
      );

    return (
      <div>
        <AppNav />
        <div className="container">
          <h2 className="mt-4" style={{ display: "inline-block" }}>
            Posts
          </h2>
          {addPost}
          <div className="row">
            {posts.map((post) => (
              <Post
                imageUrl={post.imageUrl}
                ident={post.id}
                header={post.header}
                text={post.text}
                user={post.user}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default PostList;
