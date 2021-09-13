import React, { useState, useEffect } from 'react'
import useForm from '../UseForm/useForm';
import axios from 'axios';
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
import DateTimePicker from 'react-datetime-picker';


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


const EventCalendar = (props) => {
    const [events, setEvent] = useState({
          eventName: "",
          address: "",
          eventDate: "",
          lat: "",
          long: "",
    });
    const classes = useStyles();
    const{values, handleChange, handleSubmit} = useForm(logEvent);
    
    function logEvent() {;
      latLong(events);
      console.log(events);
      }

    const latLong = async () => {
      setEvent (values);
      if( events.address != "" ) {
      var response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${events.address}&key=AIzaSyDh6A6X-LRCTfF57FUpDFP56syHXGkm3sY`)
      var results = (response.data);
      try {
        setEvent(events.lat=results.results[0].geometry.location.lat,
          events.long=results.results[0].geometry.location.lng)
      }
      catch (err) {
        console.log(err);
      }
      }
      console.log(events);
      postEvent(events);
    }

    const postEvent = async (event) => {
      try{
        const jwt = localStorage.getItem("token");
          var res = await axios.post(`https://localhost:44394/api/event`, event, {headers: {Authorization: "Bearer " + jwt}});
          return(res);
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
                    Register Events
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="eDate"
                        name="eventDate"
                        className={classes.textField}
                        variant="outlined"
                        fullWidth
                        id="eventDate"
                        type="datetime-local"
                        onChange={handleChange}
                        values={values.eventDate}
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="eName"
                        name="eventName"
                        variant="outlined"
                        fullWidth
                        id="eventName"
                        label="Event Name"
                        onChange={handleChange}
                        values={values.eventName}
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
            {/* <Container>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                        Events
                        </ListSubheader>
                    }
                    >
                    {events.map(event => (
                        <ul key={event.id}>
                        <ListItem>
                          {event.eventName}
                          {event.address}
                          {event.eventDate}
                        </ListItem>
                        <Divider variant="inset" component="ul" />
                        </ul>
                    ))}
                </List>
            </Container> */}
        </React.Fragment>
    );
};

export default EventCalendar;