import React, { useState, useEffect, useContext } from 'react';
import useForm from '../UseForm/useForm'
import axios from 'axios';
import { CommentContext } from '../Comment/comment';
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

const SubComment = (props) => {
    const [subComments, setSubComment] = useState([]);
    const comment = this.props.comment.id;
    const classes = useStyles();
    console.log(comment)
    const {values, handleChange, handleSubmit} = useForm(create);
    function create () {
        postSubComment(values);
    }

    useEffect (() => {
        fetchData();    
        },[subComments.length > 0])
    
    const fetchData = async (comment) => {
        try {
            const res = await axios.get(`https://localhost:44394/api/subcomment/${comment}`)
            setSubComment(res.data);
        }
        catch (err) {
            alert(err);
        }
    }
    
    const postSubComment = async (event) => {
        try{
          const jwt = localStorage.getItem("token");
            var res = await axios.post(`https://localhost:44394/api/subcomment`, event, {headers: {Authorization: "Bearer " + jwt}});
            setSubComment([...subComments, (res.data)])
        }
        catch(err){
            alert(err);
        }
      }

    return (
        <React.Fragment>
            <Container>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    >
                    {subComments.map(subComment => (
                        <ul key={subComment.id}>
                        <a>{subComment.userSubComment}</a>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                SubComment
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                    autoComplete="usubcomment"
                                    name="userSubComment"
                                    variant="outlined"
                                    fullWidth
                                    id="userSubComment"
                                    label="SubComment"
                                    onChange={handleChange}
                                    values={values.userSubComment}
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
                        <Divider variant="inset" component="ul" />
                        </ul>
                    ))}
                </List>
            </Container>
        </React.Fragment>
    )
}
export default SubComment;