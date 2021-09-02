import React, {useState, createContext, useEffect, useContext} from 'react';
import useForm from '../UseForm/useForm'
import './comment.css';
import axios from 'axios';
import SubComment from '../SubComment/subComment';


const Comment = (props) => {
    const [comment, setComment] = useState({ Comments: [] });
    const {values, handleChange, handleSubmit} = useForm(create);

    function create () {
        postComment(values);
        cancelCourse();
        fetchData();
    }

    useEffect (() => {
        fetchData();    
        console.log(comment);
        },[comment.length > 0])
    
    const fetchData = async () => {
        try {
            const res = await axios.get(`https://localhost:44394/api/comment`)
            setComment(res.data);
        }
        catch (err) {
            alert(err);
        }
    }
        
    const postComment = async (event) => {
        try{
          const jwt = localStorage.getItem("token");
            var res = await axios.post(`https://localhost:44394/api/comment`, event, {headers: {Authorization: "Bearer " + jwt}});
            setComment(comment + res)
        }
        catch(err){
            alert(err);
        }
      }
    function renderMap() {
        // if(comment.length > 0) {
            return (
                <ul>
                    {comment.Comments.map(Comments => (
                        <li key={Comments.id}>
                        <a>{Comments.userComment}</a>
                        <SubComment {...props}/>
                        </li>
                    ))}
                </ul>
            )
        // }
    }

    const cancelCourse = () => {
      document.getElementById("create-course-form").reset();
    }
  

    return (
        <React.Fragment>
            <div class="column" width="100%"></div>
                <div class="d-flex justify-content-center" width="max-width">
                    <tbody>
                        <div class="container">
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
                                    <label for="floatingInput">User Comment </label>
                                </div>
                                <div className="form-floating" align="right">
                                    <button className="w-10 btn btn-lg btn-primary" type="submit">
                                    Submit
                                    </button>
                                </div>
                            </form>
                            <div class="d-flex justify-content-center" align="center">
                                {renderMap}
                            </div>
                            </td>
                        </div>
                    </tbody>
                </div>
        </React.Fragment>
    )
}

export default Comment;