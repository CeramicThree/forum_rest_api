import './App.css';
import PostList from '../Post/PostList'
import { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AddPost from '../Post/AddPost';
import LoginForm from '../LoginForm/LoginForm';
import Profile from '../Profile/Profile';
import SinglePost from '../Post/SinglePost';

class App extends Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route path='/' exact component={PostList} />
          <Route path='/addPost' exact component={AddPost} />
          <Route path='/login' exact component={LoginForm} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/post/:ident' exact component={SinglePost} />
        </Switch>
      </Router>
    );
  }
}

export default App;
