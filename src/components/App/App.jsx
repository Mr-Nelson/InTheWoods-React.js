import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Redirect, Route, Switch, usehistory} from "react-router-dom";
import jwtDecode, {InvalidTokenError} from "jwt-decode";
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
import EventCalendar from '../Calendar/eventCalendar';
import MakeCalendar from '../Calendar/FullCalendar';
import Department from '../Departments/department';
import Logout from '../Logout/logout';
import MapContainer from '../Map/map.jsx';
import { Container } from '@material-ui/core';


function App (props) {
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

  const getUserInfo = async () => {
    const jwt = localStorage.getItem('token');
    const res = await axios.get(
      `https://localhost:44394/api/user`, {headers: {Authorization: 'Bearer ' + jwt}});
    var user = res.data;
    setUser(user);
}

    return (
      <React.Fragment>
        <TitleBar />

        
        <Switch>

          <Route path="/home" 
          render={(props) => <Comment  {...props} getUser={getUser} />}
          />

          <Route
            path="/login"
            render={(props) => <Login {...props} getUser={getUser}/>}
            Redirect="/"
          />
          
          <Route
            path="/profile"
            render={(props) => <Profile {...props} getUser={getUser}/>}
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
            render={(props) => <MapContainer {...props} google={props.google}/>}
            Redirect="/"
          />

            <Route
            path="/document"
            render={(props) => <Document {...props} getUser ={getUser} />}
            Redirect="/"
          />

            <Route
            path="/department"
            render={(props) => <Department {...props} getUser ={getUser} />}
            Redirect="/"
          />
            
            <Route
            path="/logout"
            render={(props) => <Logout {...props} getUser ={getUser} />}
            Redirect="/"
          />
          
          <Redirect to="not-found" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
}

export default App;