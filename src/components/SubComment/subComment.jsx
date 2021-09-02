import React, { useState, useEffect, useContext } from 'react';
import useForm from '../UseForm/useForm'
import axios from 'axios';
import { CommentContext } from '../Comment/comment';



const SubComment = (props) => {
    const [subComment, setSubComment] = useState();
    const comment = this.props.comment.id;
    const {values, handleChange, handleSubmit} = useForm(create);
    function create () {
        postSubComment(values);
        cancelCourse();
    }

    useEffect (() => {
        fetchData();    
        },[subComment.length > 0])
    
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
            setSubComment(res)
        }
        catch(err){
            alert(err);
        }
      }

    const getSubComment = async (event) => {
        try{
          const res = await axios.get(`https://localhost:44394/api/subcomment/${event}`)
          setSubComment(res);
        }
        catch(err){
          alert(err);
        }
    }
    
    function renderMap() {
        if(comment.length > 0) {
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
        }
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
                            <div>
                                {renderMap}
                            </div>
                            <td className="d-flex justify-content-center">
                            <form id="create-course-form" className="col-md-25" onSubmit={handleSubmit}>
                                <h4 className="h3 mb-3 fw-normal">Leave a SubComment!</h4>
                                <div className="form-floating">
                                    <input
                                        name="UserComment"
                                        type="string"
                                        className="form-control"
                                        placeholder="CommentHere"
                                        required="true"
                                        onChange={handleChange}
                                        values={values.userSubComment, comment.id}
                                    />
                                    <label for="floatingInput">User SubComment </label>
                                </div>
                                <div className="form-floating" align="right">
                                    <button className="w-10 btn btn-lg btn-primary" type="submit">
                                    Submit
                                    </button>
                                </div>
                            </form>
                            </td>
                        </div>
                </tbody>
            </div>
        </React.Fragment>
    )
}
export default SubComment;