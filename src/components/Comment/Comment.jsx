import React from 'react';
import useForm from '../UseForm/useForm'
import './comment.css';


const Comment = (props) => {
    const {values, handleChange, handleSubmit} = useForm(create);
    function create () {
        props.postComment(values);
        cancelCourse();
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
                            </td>
                        </div>
                        <div className="feed" align="center">
                            {props.comments.map((comment, id) => {
                                <div key={id} value={comment} />
                                return (
                                    <tr className="table-row" key= {id}>
                                        <span>
                                            <td>{comment.userComment}</td>
                                        </span>
                                    </tr>    
                                )                   
                            })}  
                        </div>
                </tbody>
            </div>
        </React.Fragment>
    )
}

export default Comment;