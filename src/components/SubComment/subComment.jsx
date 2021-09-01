import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import useForm from '../UseForm/useForm'
import axios from 'axios';

const Comment = (props) => {
    const [subComment, setSubComment] = useState();
    const {values, handleChange, handleSubmit} = useForm(create);
    function create () {
        postSubComment(values);
        cancelCourse();
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
    
    const MapStateComment = () => {
        const [mapState, setMapState] = useState(new Map());
        const updateMap = (key, value) => {
            setMapState(map => new Map(map.set( key, value)));
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
                                        values={values.userSubComment}//, comment.id}
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
                        <div className="feed" align="center">
                            {MapStateComment(subComment.id, subComment.userSubComment)}  
                        </div>
                </tbody>
            </div>
        </React.Fragment>
    )
}

export default Comment;