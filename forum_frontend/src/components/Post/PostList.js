import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppNav from '../AppNav/AppNav';
import Post from './Post';


class PostList extends Component{
    state = {
        posts : [],
        isLoading : true
    }
    
    async componentDidMount(){
        const response = await fetch('/api/posts')
        const body = await response.json();
        this.setState({
            posts : body,
            isLoading : false
        });
    }

    render() {
        const {posts, isLoading} = this.state;
        if(isLoading) 
            return (<div>Loading...</div>);

        return(
            <div>
                <AppNav />
                    <div className="container">
                        <h2 className="mt-4" style={{display:"inline-block"}}>Posts</h2>
                        <Link to="/addPost" className="btn btn-success mt-4" style={{float: "right", display:"inline-block", marginRight: "14vh"}} replace>+ Add Post</Link>
                        <div className="row">
                            {
                                posts.map(post => <Post ident = { post.id } header = { post.header } text = { post.text } user = { post.user } />)
                            }
                        </div>
                    </div>
            </div>
        )
    }
}

export default PostList;