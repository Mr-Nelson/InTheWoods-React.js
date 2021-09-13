import React, {useState, createContext, useEffect, useContext} from 'react';
import useForm from '../UseForm/useForm'
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
      root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      },

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
    nested: {
        paddingLeft: theme.spacing(4),
    },
  }));

const Comment = (props) => {
    const [comments, setComment] = useState([]);
    const [subComments, setSubComment] = useState([]);
    const [rerender, setRerender] = useState(false);
    const [onShow, setOnShow] = useState(false);
    const classes = useStyles();
    const {values, handleChange, handleSubmit} = useForm(create);
    const {subValues, handleSubChange, handleSubSubmit} = useSubForm(subCreate)
    const ac = new AbortController();
    
    function create () {
      postComment(values);
    }

    function subCreate () {
      postSubComment(values);
    }

    useEffect (() => {
        fetchData();
        fetchSubComments();
        },[rerender])

    const fetchData = async () => {
        try {
            const res = await axios.get(`https://localhost:44394/api/comment`)
            var newComments = res.data;
            setComment(newComments);
        }
        catch (err) {
            alert(err);
        }
  
    }

    async function fetchSubComments() {
      try {
        const res = await axios.get(`https://localhost:44394/api/subcomment/`);
        var subComments = res.data;
        setSubComment(subComments)
      }
      catch (err) {
        alert(err);
      }
      console.log(subComments);
  }
  const triggerRerender=()=>{
    setRerender(!rerender);
  }
        
    const postComment = async (event) => {
        try{
          const jwt = localStorage.getItem("token");
            var res = await axios.post(`https://localhost:44394/api/comment`, event, {headers: {Authorization: "Bearer " + jwt}});
          triggerRerender()

        }
      catch(err){
            alert(err);
        }
      }

      const postSubComment = async (event) => {
        try{
          const jwt = localStorage.getItem("token");
            var res = await axios.post(`https://localhost:44394/api/subcomment`, event, {headers: {Authorization: "Bearer " + jwt}});
            triggerRerender();
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
                    Comment
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="ucomment"
                        name="userComment"
                        variant="outlined"
                        fullWidth
                        id="userComment"
                        label="Comment"
                        onChange={handleChange}
                        values={values.userComment}
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
                    Previous comments
                    </ListSubheader>
                }>
                {comments >= [0] && (
                (subComments.map(subComment => (
                  <ul key={subComment.commentId} > 
                  <ListItem>{subComment.userComment}</ListItem>
                  <ListItem>{subComment.userSubComment}</ListItem>
                  <ListItem>
                    <Container component="nested" maxWidth="sm">
                      <CssBaseline />
                      <div className={classes.paper}>
                      <Typography item xs={12} sm={6} component="h1" variant="h8">
                          SubComment
                      </Typography>
                      <form className={classes.form}  noValidate onSubmit={handleSubSubmit}>
                          <Grid container spacing={0}>
                          <Grid item xs={12}>
                              <TextField
                              autoComplete="usubcomment"
                              name="userSubComment"
                              variant="outlined"
                              fullWidth
                              id="userSubComment"
                              label="SubComment"
                              onChange={handleSubChange}
                              values={subValues.userSubComment}
                              autoFocus
                              />
                          </Grid>
                          </Grid>
                          <Grid container justifyContent="flex-end">
                          <Button 
                      type="submit"
                      halfWidth="true"
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
                  </ListItem>
                  <Divider variant="inset" component="ul" />
                  </ul>
                ))))}  
              </List>
            </Container>
        </React.Fragment>
    )
}

export default Comment;