import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Redirect, Route, Switch, usehistory} from "react-router-dom";
import jwtDecode, {InvalidTokenError} from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import TitleBar from '../TitleBar/titleBar';
import NavBar from '../NavBar/navBar';
import Footer from '../Footer/footer';
// import Feed from '../Feed/feed';
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
// import google from "google-maps-react";
// import { Loader } from "@googlemaps/js-api-loader";


function App () {
  const [user, setUser] = useState();


  useEffect (() => {
    const jwt = localStorage.getItem("token");
    try {
      const user = jwtDecode(jwt);
      setUser(user);
    }
      catch (ex)
      {console.log(ex)};
  },[])


    // const additionalOptions = {};
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

  const getUser = async (event) =>{   
    var res = await axios.post(
      `https://localhost:44394/api/authentication/login`, event
    );
    let token = res.data.token;
    localStorage.setItem('token', token);
    console.log(res.data.token);
    getUserInfo();     
    setUser(user);
    console.log(res.data);
  }

  const getUserInfo = async (event) => {
    const jwt = localStorage.getItem('token');
    var res = await axios.get(
      `https://localhost:44394/api/user`, {headers: {Authorization: 'Bearer ' + jwt}});
      setUser(res);
  }

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
          render={(props) => <Comment  {...props} getUserInfo={getUser} />}
          // render={(props) => <SubComment {...props} userUserInfo={this.getUserInfo} subcomments={subcomments} postSubComment={this.postSubComment} />}
          />

          <Route
            path="/login"
            render={(props) => <Login {...props} getUser={getUser}/>}
            Redirect="/"
          />
          
          <Route
            path="/profile"
            render={(props) => <Profile {...props} getUserInfo={getUserInfo}/>}
            Redirect="/"
          />

          <Route
            path="/register"
            render={(props) => <Registration {...props} redirect={<Redirect to="/login"/>} />}
            Redirect to="/login"
          />

            <Route
            path="/event"
            render={(props) => <EventCalendar {...props} />}
            Redirect="/"
          />

            <Route
            path="/calendar"
            render={(props) => <MakeCalendar {...props} />}
            Redirect="/"
          />

            <Route
            path="/map"
            render={(props) => <MapCalendar {...props} />}
            Redirect="/"
          />

            <Route
            path="/document"
            render={(props) => <Document {...props} getUserInfo ={getUserInfo} />}
            Redirect="/"
          />

            <Route
            path="/department"
            render={(props) => <Department {...props} getUserInfo ={getUserInfo} />}
            Redirect="/"
          />
            
            <Route
            path="/logout"
            render={(props) => <Logout {...props} getUserInfo ={getUserInfo} />}
            Redirect="/"
          />
          
          <Redirect to="not-found" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
}

export default App;