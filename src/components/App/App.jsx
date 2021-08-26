import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Redirect, Route, Switch, usehistory} from "react-router-dom";
import jwtDecode, {InvalidTokenError} from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import TitleBar from '../TitleBar/titleBar';
import NavBar from '../NavBar/navBar';
import Login from '../Login/login';
import Profile from '../Profile/profile';
import Registration from '../Registration/registration';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: "",
      comment: [],
      subcomment: [],
      event: []
    };
  }
  componentDidMount() {
    const jwt = localStorage.getItem("token");
    try {
      const user = jwtDecode(jwt);
      this.setState({user});
    }
      catch (ex)
      {console.log(ex)}
  }

  newUser = async (event) => {
    console.log(event)
    try{
    var res = await axios.post(
      `https://localhost:44394/api/authentication`,
      event);
    console.log(res);
    //setRedirect(true);
  
    return this.setState({
      user: res.data,
    });
        
  }
  catch(err){
    alert(err);
  }
  };

  getUser = async (event) =>{    
    var res = await axios.post(
      `https://localhost:44394/api/authentication/login`, event
    );
    let token = res.data.token;
    localStorage.setItem('token', token);
    console.log(res.data.token);
    this.getUserInfo();     
  this.setState({
    user:res.data
  }); console.log(res.data)}


  getUserInfo = async (event) => {
    const jwt = localStorage.getItem('token');
    var response = await axios.get(
      `https://localhost:44394/api/user`, {headers: {Authorization: 'Bearer ' + jwt}});
      console.log(response.data);
      this.setState({
        userid: response.data.id
      })
  }

  render() {
    const user = this.state.user;
    return (
      <React.Fragment>
        <TitleBar />
        <NavBar />
        
        <Switch>
          {/* <route path ='/register' render ={props => {
            if (!user){
              return <Redirect to='/login'/>;
            }else{
              return <Home{...props} user={user}/>
            }
          }} */}
        {/* /> */}
          <Route path="/" exact component={Profile}>
          {/* <MerchForm userid={this.getUserInfo} getAllItems={this.getAllItems}/> */}
          {/* <ReviewForm userid={this.getUserInfo} /> */}
          {/* <DisplayMerch items={this.state.items} addToCart={this.addToCart}/>
          <MerchModal />
          <MerchDetails /> */}
          </Route>

          <Route
            path="/login"
            render={(props) => <Login {...props} getUser={this.getUser} />}
          />

          <Route
            path="/register"
            render={(props) => <Registration {...props} newUser={this.newUser} />}
          />

          
          {/* <DisplayShoppingCart /> */}
          <Redirect to="not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
