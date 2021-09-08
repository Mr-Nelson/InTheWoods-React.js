import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Profile = (props) => {
    const [user, setUser] = useState([])
    const classes = useStyles();
    
    useEffect (() => {
        fetchData();
        console.log(user);
        },[user.length > 0])



    const fetchData = async () => {
        const jwt = localStorage.getItem('token');
        const res = await axios.get(
          `https://localhost:44394/api/user`, {headers: {Authorization: 'Bearer ' + jwt}});
        var user = res.data;
        setUser(user);
    }

    return (


        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome {user.firstName}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label={user.firstName}
                //   onChange={handleChange}
                //   values={values.firstname}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label={user.lastName}
                  name="lastName"
                //   onChange={handleChange}
                //   values={values.lastname}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label={user.email}
                  name="email"
                //   onChange={handleChange}
                //   values={values.email}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="PhoneNumber"
                  label={user.phoneNumber}
                  type="phoneNumber"
                  id="phonenumber"
                //   onChange={handleChange}
                //   values={values.phonenumber}
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="UserName"
                  label={user.userName}
                  type="username"
                  id="username"
                //   onChange={handleChange}
                //   values={values.username}
                  autoComplete="username"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="Password"
                  label={user.Password}
                  type="password"
                  id="password"
                //   onChange={handleChange}
                //   values={values.password}
                  autoComplete="current-password"
                />
              </Grid> */}
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Not seeing your information? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
}
export default Profile;