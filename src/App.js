import React , {Component, Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import Alert from './components/layout/Alert';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import { About } from './components/Pages/About';
import User from './components/users/User';

class App extends  Component {
  state = {
    users: [],
    loading: false, 
    alert: null,
    user: {},
    repos : []
  };

//  async componentDidMount()
//  {

//  this.setState({loading: true});
//  const res = await  axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
//  this.setState({users: res.data , loading: false});
//  // console.log(res.data);
// }
searchUsers = async text => {
  this.setState({loading: true});
  const res = await  axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  this.setState({users: res.data.items,loading: false});
}
 
// Get Single Github User
getUser = async (username) => {
  this.setState({loading: true});
  const res = await  axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  this.setState({user: res.data ,loading: false});
}
// get users Repos 
getUserRepos = async (username) => {
  this.setState({loading: true});
  const res = await  axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  this.setState({repos: res.data ,loading: false});
}

// Clear user from state
clearUsers = () => {
   this.setState({users:[],loading:false});
}
 
// set Alert
setAlert  = (msg , type) => {
      this.setState({alert : {msg : msg , type : type}})
      setTimeout( () => this.setState({alert : null}) , 5000);
}

 render(){
   const {users , user , repos ,  loading} = this.state;

   return (
  <Router>
    <div className = 'App'>
      <Navbar />  
      <div className = 'container'>  
      <Alert alert = {this.state.alert} />
      <Switch>
        <Route exact path = '/' render = {props => (
          <Fragment>
           <Search searchUsers = {this.searchUsers} clearUsers = {this.clearUsers} showClear = {
        users.length > 0  ? true : false}
        setAlert = {this.setAlert}
      />
       <Users loading = {loading} users = {users}/>
          </Fragment>
        )} /> 
        <Route exact path = '/About' component = {About} />
        <Route exact path  = '/User/:login' render = {props => (
          <User {...props } getUser={this.getUser} getUserRepos={this.getUserRepos} user = {user} repos = {repos} loading = {loading}/>
        )}/>
        </Switch>
      
    </div>
     </div>
  </Router>
  );
}
}
export default App;
