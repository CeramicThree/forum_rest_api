import './App.css';
import PostList from '../Post/PostList'
import { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AddPost from '../Post/AddPost';

class App extends Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route path='/' exact component={PostList} />
          <Route path='/addPost' exact component={AddPost} />
        </Switch>
      </Router>
    );
  }
}

export default App;
