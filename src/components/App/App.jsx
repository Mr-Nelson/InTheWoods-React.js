import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Redirect, Route, Switch, usehistory} from "react-router-dom";
import jwtDecode, {InvalidTokenError} from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import TitleBar from '../TitleBar/titleBar';
import NavBar from '../NavBar/navBar';
import Footer from '../Footer/footer';
import Feed from '../Feed/feed';
import Login from '../Login/login';
import Profile from '../Profile/profile';
import Registration from '../Registration/registration';
import Document from '../Documents/documents';
import Comment from '../Comment/comment';
import SubComment from '../SubComment/subComment';
import EventCalendar from '../Calendar/eventCalendar';
import MakeCalendar from '../Calendar/FullCalendar';
import Department from '../Departments/department';
import Logout from '../Logout/logout';
import MapCalendar from '../Map/map';
import google from "google-maps-react";
import { Loader } from "@googlemaps/js-api-loader";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: "",
      comments: [],
      subcomments: [],
      events: [],
      map: []
    };
  }
  componentDidMount() {
    const jwt = localStorage.getItem("token");
    try {
      const user = jwtDecode(jwt);
      this.setState({user});
    }
      catch (ex)
      {console.log(ex)};
    this.getAllComments();
    const additionalOptions = {};
    // [START maps_programmatic_load_promise]
    // const loader = new Loader({
    //   apiKey: "AIzaSyDh6A6X-LRCTfF57FUpDFP56syHXGkm3sY",
    //   version: "monthly",
    //   ...additionalOptions,
    // });
    // loader.load().then(() => {
    //   this.map = new google.maps.Map(document.getElementById("map"), {
    //     center: { lat: 43.30733170190016, lng: -96.4305045435752},
    //     zoom: 8,
    //     mapId: "INWOOD_IA"
    //   });
    // });
    // [END maps_programmatic_load_promise]
    // [END maps_programmatic_load]
  }
  
  newUser = async (event) => {
    console.log(event)
    try{
    var res = await axios.post(
      `https://localhost:44394/api/authentication`,
      event);
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
    var res = await axios.get(
      `https://localhost:44394/api/user`, {headers: {Authorization: 'Bearer ' + jwt}});
      this.setState({
        userid: res.data.id
      })
  }

  postEvent = async (event) => {
    try{
      const jwt = localStorage.getItem("token");
        var res = await axios.post(`https://localhost:44394/api/event`, event, {headers: {Authorization: "Bearer " + jwt}});
        this.setState({
            event: res.data
        });
    }
    catch(err){
        alert(err);
    }
  }

  postComment = async (event) => {
    try{
      const jwt = localStorage.getItem("token");
        var res = await axios.post(`https://localhost:44394/api/comment`, event, {headers: {Authorization: "Bearer " + jwt}});
        this.setState({
            comments: res.data
        });
    }
    catch(err){
        alert(err);
    }
  }

  getAllComments = async (event) => {
    try{
      const res = await axios.get(`https://localhost:44394/api/comment`)
      this.setState({
        comments: res.data
      })
    }
    catch(err){
      alert(err);
    }
  }

  postSubComment = async (event) => {
    try{
      const jwt = localStorage.getItem("token");
        var res = await axios.post(`https://localhost:44394/api/subcomment`, event, {headers: {Authorization: "Bearer " + jwt}});
        this.setState({
            subcomments: res.data
        });
    }
    catch(err){
        alert(err);
    }
  }  
  
  getAllSubComments = async (event) => {
      try{
        const res = await axios.get(`https://localhost:44394/api/subcomment/${event}`)
        this.setState({
          subcomments: res.data
        })
        console.log(this.subcomments)
      }
      catch(err){
        alert(err);
      }
    }

  render() {
    const user = this.state.user;
    const comments = this.state.comments;
    const subcomments = this.state.subcomments;
    const map = this.state.map;

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
          <Route path="/home" 
          render={(props) => <Comment  {...props} userUserInfo={this.getUserInfo} comments={comments} postComment={this.postComment} />}
          // render={(props) => <SubComment {...props} userUserInfo={this.getUserInfo} subcomments={subcomments} postSubComment={this.postSubComment} />}
          />

          <Route
            path="/login"
            render={(props) => <Login {...props} getUser={this.getUser}/>}
            Redirect="/"
          />
          
          <Route
            path="/profile"
            render={(props) => <Profile {...props} getUserInfo={this.getUserInfo}/>}
            Redirect="/"
          />

          <Route
            path="/register"
            render={(props) => <Registration {...props} newUser={this.newUser} redirect={<Redirect to="/login"/>} />}
            Redirect to="/login"
          />

            <Route
            path="/event"
            render={(props) => <EventCalendar {...props} postEvent={this.postEvent} />}
            Redirect="/"
          />

            <Route
            path="/calendar"
            render={(props) => <MakeCalendar {...props} events={this.events} />}
            Redirect="/"
          />

            <Route
            path="/map"
            render={(props) => <MapCalendar {...props} events={this.events} map/>}
            Redirect="/"
          />

            <Route
            path="/document"
            render={(props) => <Document {...props} userId ={this.getUserInfo} />}
            Redirect="/"
          />

            <Route
            path="/department"
            render={(props) => <Department {...props} userId ={this.getUserInfo} />}
            Redirect="/"
          />
            
            <Route
            path="/logout"
            render={(props) => <Logout {...props} userId ={this.getUserInfo} />}
            Redirect="/"
          />
          
          <Redirect to="not-found" />
        </Switch>
        <Footer />

      </React.Fragment>
    );
  }
}

export default App;
