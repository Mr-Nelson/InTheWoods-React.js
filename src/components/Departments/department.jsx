import React, { useState, useEffect, useContext } from 'react';
import useForm from '../UseForm/useForm';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { CssBaseline } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Button } from '@material-ui/core';


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
  root: {
      width: '100%',
      maxWidth: 600,
      backgroundColor: theme.palette.background.paper,
  },
  nested: {
      paddingLeft: theme.spacing(4),
  },
}));

const Department = (props) => {
    const [departments, setDepartment] = useState([]);
    const classes = useStyles();
    const { values, handleChange, handleSubmit } = useForm(create);
    const [ redirect, setRedirect] = useState(false);

    function create() {
      postDepartment(values);
    }

    useEffect (() => {
      fetchData();
      console.log(departments);
      },[departments.length > 0])
  
  const fetchData = async () => {
      try {
          const res = await axios.get(`https://localhost:44394/api/department`)
          var departments = res.data;
          setDepartment(departments);
      }
      catch (err) {
          alert(err);
      }
  }

    const postDepartment = async (event) => {
      try{
        const jwt = localStorage.getItem("token");
          var res = await axios.post(`https://localhost:44394/api/department`, event, {headers: {Authorization: "Bearer " + jwt}});
          setDepartment([...departments, (res.data)]);
      }
      catch(err){
          alert(err);
      }
    }  

  
    return (
<React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Department
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="company"
                        name="company"
                        variant="outlined"
                        fullWidth
                        id="company"
                        label="Company"
                        onChange={handleChange}
                        values={values.company}
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="address"
                        name="address"
                        variant="outlined"
                        fullWidth
                        id="address"
                        label="Address"
                        onChange={handleChange}
                        values={values.address}
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="hours"
                        name="hours"
                        variant="outlined"
                        fullWidth
                        id="hours"
                        label="Hours"
                        onChange={handleChange}
                        values={values.hours}
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="managername"
                        name="managerName"
                        variant="outlined"
                        fullWidth
                        id="managerName"
                        label="Manager Name"
                        onChange={handleChange}
                        values={values.managername}
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="phonenumber"
                        name="phoneNumber"
                        variant="outlined"
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        onChange={handleChange}
                        values={values.phonenumber}
                        autoFocus
                        />
                    </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                    <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Submit
                </Button>
                    </Grid>
                </form>
                </div>
            </Container>
            <Container>
                <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                            Departments
                            </ListSubheader>
                        }
                        >
                        {departments.map(department => (
                            <ul key={department.departmentId}>
                            <ListItem>{department.company}</ListItem>
                            <ListItem>{department.address}</ListItem>
                            <ListItem>{department.hours}</ListItem>
                            <ListItem>{department.managerName}</ListItem>
                            <ListItem>{department.phoneNumber}</ListItem>
                            <Divider variant="inset" component="ul" />
                            </ul>
                        ))}
                    </List>
                </Container>
        </React.Fragment>
    );
  };

  export default Department;