import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import useForm from "../UseForm/useForm";
import Select from "react-select";
import axios from "axios";
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        In The Woods
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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


const Register = (props) => {
  const { values, handleChange, handleSubmit } = useForm(create);
  const [ redirect, setRedirect] = useState(false);
  const classes = useStyles();
  function create() {
    newUser(values);
    setRedirect(true);
    <Redirect to= '/login'/>;
    cancelCourse();
  }

  const newUser = async (event) => {
    console.log(event)
    try{
    var res = await axios.post(
      `https://localhost:44394/api/authentication`,
      event);  
    }
    catch(err){
      alert(err);
    }
  };

  const cancelCourse = () => {
    document.getElementById("create-course-form").reset();
  }
  

  const options = [
    {value:"true", label: "admin"},
    {value:"false", label: "user"}
  ]
  
  return (

      <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      onChange={handleChange}
                      values={values.firstname}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      onChange={handleChange}
                      values={values.lastname}
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      onChange={handleChange}
                      values={values.email}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="PhoneNumber"
                      label="PhoneNumber"
                      type="phoneNumber"
                      id="phonenumber"
                      onChange={handleChange}
                      values={values.phonenumber}
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="UserName"
                      label="username"
                      type="username"
                      id="username"
                      onChange={handleChange}
                      values={values.username}
                      autoComplete="username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="Password"
                      label="Password"
                      type="password"
                      id="password"
                      onChange={handleChange}
                      values={values.password}
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Container>

    // <div>
    //   <div>
    //     <form id="create-course-form" className="col-md-2" onSubmit={handleSubmit} >
    //       <h1 className="h3 mb-3 fw-normal">Please Register</h1>

    //       <div className="form-floating">
    //         <input
    //           name="FirstName"
    //           type="string"
    //           className="form-control"
    //           placeholder="John"
    //           required
    //           onChange={handleChange}
    //           values={values.firstname}
    //         />
    //         <label for="floatingInput">First Name </label>
    //       </div>
    //       <div className="form-floating">
    //         <input
    //           name="LastName"
    //           type="string"
    //           className="form-control"
    //           placeholder="Doe"
    //           onChange={handleChange}
    //           values={values.lastname}
    //         />
    //         <label for="floatingPassword">Last Name</label>
    //       </div>
    //       <div className="form-floating">
    //         <input
    //           name="UserName"
    //           type="string"
    //           className="form-control"
    //           placeholder="John123"
    //           onChange={handleChange}
    //           values={values.username}
    //         />
    //         <label for="floatingInput">User Name</label>
    //       </div>
    //       <div className="form-floating">
    //         <input
    //           name="Password"
    //           type="password"
    //           className="form-control"
    //           placeholder="112234344rrttyyuu"
    //           onChange={handleChange}
    //           values={values.password}
    //         />
    //         <label for="floatingInput">Password</label>
    //       </div>
    //       <div className="form-floating">
    //         <input
    //           name="Email"
    //           type="email"
    //           className="form-control"
    //           placeholder="name@example.com"
    //           onChange={handleChange}
    //           values={values.email}
    //         />
    //         <label for="floatingInput">Email address</label>
    //       </div>
    //       <div className="form-floating">
    //         <input
    //           name="PhoneNumber"
    //           type="phoneNumber"
    //           className="form-control"
    //           placeholder="555-555-5555"
    //           onChange={handleChange}
    //           values={values.phonenumber}
    //         />
    //         <label for="floatingInput">Phone Number</label>
    //       </div>
    //       <div className="form-floating" onChange={handleChange}>
    //         <Select
    //           name="identityrole"
    //           placeholder="select user or admin"
    //           options = {options}
    //           values={values.identityrole}
    //         />
    //         <label for="floatingInput">Role</label>
    //       </div>
    //       <div className="form-floating">
    //       <button className="w-10 btn btn-lg btn-primary" type="submit">
    //         REGISTER
    //       </button>
    //       </div>
    //       <p className="mt-5 mb-3 text-muted">© 2021</p>
    //     </form>
    //   </div>
    // </div>
  );
};

export default Register;