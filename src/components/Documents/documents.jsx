import React, { useState, useEffect } from 'react';
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


const Document = (props) => {
    const [documents, setDocument] = useState([]);
    const classes = useStyles();
    const { values, handleChange, handleSubmit } = useForm(create);
    const [ redirect, setRedirect] = useState(false);

    function create() {
      postDocument(values);
      setRedirect(true);
      fetchData();
    }

    useEffect (() => {
      fetchData();
      console.log(documents);
      },[documents.length > 0])
  
  const fetchData = async () => {
      try {
          const res = await axios.get(`https://localhost:44394/api/document`)
          var documents = res.data;
          setDocument(documents);
      }
      catch (err) {
          alert(err);
      }
  }

    const postDocument = async (event) => {
      try{
        const jwt = localStorage.getItem("token");
          var res = await axios.post(`https://localhost:44394/api/document`, event, {headers: {Authorization: "Bearer " + jwt}});
          setDocument([...documents, (res.data)]);
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
                    Documents
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="name"
                        name="documentName"
                        variant="outlined"
                        fullWidth
                        id="documentName"
                        label="Name"
                        onChange={handleChange}
                        values={values.documentName}
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="description"
                        name="documentDescription"
                        variant="outlined"
                        fullWidth
                        id="documentDescription"
                        label="Description"
                        onChange={handleChange}
                        values={values.documentDescription}
                        autoFocus
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                        autoComplete="file"
                        name="file"
                        variant="outlined"
                        fullWidth
                        id="file"
                        label="File"
                        onChange={handleChange}
                        values={values.file}
                        autoFocus
                        />
                    </Grid> */}
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
                        Documents
                        </ListSubheader>
                    }
                    >
                    {documents.map(document => (
                        <ul key={document.documentId}>
                        <ListItem>{document.documentName}</ListItem>
                        <ListItem>{document.documentDescription}</ListItem>
                        <ListItem>{document.file}</ListItem>
                        <Divider variant="inset" component="ul" />
                        </ul>
                    ))}
                </List>
            </Container>
        </React.Fragment>
    );
  };

  export default Document;