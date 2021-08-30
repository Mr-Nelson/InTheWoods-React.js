import React from 'react';
import useForm from '../UseForm/useForm';
import './comment.css';


const Comment = (props) => {
    const {values, handleChange, handleSubmit} = useForm(create);
    function create () {
        props.postComment(values);
        props.postSubComment(values);
    }

    return (
        <React.Fragment>
            <div class="column" width="4"></div>
                <div class="timeline-item" width="6">
                    <tbody>
                        <div class="container">
                            <tr><td>Into The Woods Q and A</td></tr>
                            <td className="d-flex justify-content-center">
                            <form className="col-md-25" onSubmit={handleSubmit}>
                                <h4 className="h3 mb-3 fw-normal">Leave a Comment!</h4>
                                <div className="form-floating">
                                    <input
                                        name="UserComment"
                                        type="string"
                                        className="form-control"
                                        placeholder="CommentHere"
                                        required
                                        onChange={handleChange}
                                        values={values.userComment}
                                    />
                                    <label for="floatingInput">User Comment </label>
                                </div>
                                <div className="form-floating">
                                    <button className="w-10 btn btn-lg btn-primary" type="submit">
                                    Submit
                                    </button>
                                </div>
                            </form>
                            </td>
                        </div>
                        <div class="container">
                            {props.comments.map((comment, id) => {
                                return (
                                    <tr key= {id}>
                                        <td>{comment.userComment}</td>
                                        <td className="d-flex justify-content-center">
                                            <button className="btn btn-primary w-md-25" onClick={() => props.getAllSubComments(comment.id)}>SubComments</button>
                                        </td>
                                        <td>
                                            {props.subcomments.map((subcomment, id) => {
                                                return (
                                                    <tr key= {id}>
                                                        <td>{subcomment.userSubComment}</td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </td>
                                    </tr>
                                )
                            })}  
                        </div>
                        <div class="container">                  
                            <td className="d-flex justify-content-center">
                            <form className="col-md-25" onSubmit={handleSubmit}>
                                <h4 className="h3 mb-3 fw-normal">Leave a SubComment!</h4>

                                <div className="form-floating">
                                    <input
                                        name="UserSubComment"
                                        type="string"
                                        className="form-control"
                                        placeholder="CommentHere"
                                        required
                                        onChange={handleChange}
                                        values={values.userSubComment}
                                    />
                                    <label for="floatingInput">User SubComment </label>
                                </div>
                                <div className="form-floating">
                                    <button className="w-10 btn btn-lg btn-primary" type="submit">
                                    Submit
                                    </button>
                                </div>
                            </form>
                            </td>
                        </div>
                </tbody>
            </div>
        <div class="column" width="4"></div>         
        <p className="mt-5 mb-3 text-muted">© 2021</p> 
        </React.Fragment>
    )
}

export default Comment;