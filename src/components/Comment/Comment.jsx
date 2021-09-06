import React, {useState, createContext, useEffect, useContext} from 'react';
import useForm from '../UseForm/useForm'
import './comment.css';
import axios from 'axios';
import SubComment from '../SubComment/subComment';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';


const Comment = (props) => {
    const [comments, setComment] = useState([]);
    const {values, handleChange, handleSubmit} = useForm(create);

    function create () {
        postComment(values);
        cancelCourse();
        fetchData();
    }

    useEffect (() => {
        fetchData();
        console.log(comments);
        },[comments.length > 0])
    
    const fetchData = async () => {
        try {
            const res = await axios.get(`https://localhost:44394/api/comment`)
            var comments = res.data;
            setComment(comments);
        }
        catch (err) {
            alert(err);
        }
    }
        
    const postComment = async (event) => {
        try{
          const jwt = localStorage.getItem("token");
            var res = await axios.post(`https://localhost:44394/api/comment`, event, {headers: {Authorization: "Bearer " + jwt}});
            setComment(fetchData)
        }
        catch(err){
            alert(err);
        }
      }

    const cancelCourse = () => {
      document.getElementById("create-course-form").reset();
    }
  
    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //       width: '100%',
    //       maxWidth: 600,
    //       backgroundColor: theme.palette.background.paper,
    //     },
    //     nested: {
    //       paddingLeft: theme.spacing(4),
    //     },
    //   }));
      
    // function NestedList() {
    //     const classes = useStyles();
    //     const [open, setOpen] = React.useState(true);
      
    //     const handleClick = () => {
    //       setOpen(!open);
    //     };
    //     return (
            
    //     )
    // }

    return (
        <React.Fragment>
            <div class="column" width="100%"></div>
                <div class="d-flex justify-content-center" width="max-width">
                    <tbody>
                        <div class="container" vw="60" vh="100">
                            <tr><td><h1>Into The Woods Q and A</h1></td></tr>
                            <td className="d-flex justify-content-center">
                            <form id="create-course-form" className="col-md-25" onSubmit={handleSubmit}>
                                <h4 className="h3 mb-3 fw-normal">Leave a Comment!</h4>
                                <div className="form-floating">
                                    <input
                                        name="UserComment"
                                        type="string"
                                        className="form-control"
                                        placeholder="CommentHere"
                                        required="true"
                                        onChange={handleChange}
                                        values={values.userComment}
                                    />
                                    <label for="floatingInput">Comment </label>
                                </div>
                                <div className="form-floating" align="right">
                                    <button className="w-10 btn btn-lg btn-primary" type="submit">
                                    Submit
                                    </button>
                                </div>
                            </form>
                            </td>
                            <div class="map-render" align="center">
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                    Nested List Items
                                    </ListSubheader>
                                }
                                >
                                {comments.map(comment => (
                                    <ul key={comment.id}>
                                    <a>{comment.userComment}</a>
                                    <ListItem button onClick={(props) =><SubComment {...props}/>} > <ListItemText primary="Subcomments" />
                                    </ListItem>
                                    {/* <button className="w-10 btn-md btn-secondary" onClick={(props) =><SubComment {...props}/>} >SubComments</button> */}
                                    <Divider variant="inset" component="ul" />
                                    </ul>
                                ))}
                            </List>
                            </div>
                        </div>
                    </tbody>
                </div>
        </React.Fragment>
    )
}

export default Comment;