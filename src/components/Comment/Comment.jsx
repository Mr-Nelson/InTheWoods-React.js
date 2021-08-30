import React from 'react';
import useForm from '../UseForm/useForm';
import './comment.css';


const Comment = (props) => {
    const {values, handleChange, handleSubmit} = useForm(create);
    function create () {
        if(values.UserComment != null) {
            props.postComment(values);
        }
        else {
            props.postSubComment(values);
        }
        console.log(values)
    }

    return (
        <React.Fragment>
            <div class="column" width="100%"></div>
                <div class="d-flex justify-content-center" width="max-width">
                    <tbody>
                        <div class="container">
                            <tr><td><h1>Into The Woods Q and A</h1></td></tr>
                            <td className="d-flex justify-content-center">
                            <form className="col-md-25" onSubmit={handleSubmit}>
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
                        <div class="container" align="center">
                            {props.comments.map((comment, id) => {
                                return (
                                    <tr className="table-row" key= {id}>
                                        <span>
                                            <td>{comment.userComment}</td>
                                        </span>
                                        <span>
                                            <td className="d-flex justify-content-center" align="bottom">
                                                <button className="btn btn-primary w-md-25" onClick={() => props.getAllSubComments(comment.id)}>SubComments</button>
                                            </td>
                                        </span>
                                        <span>
                                            <td>
                                                {props.subcomments.map((subcomment, id) => {
                                                    return (
                                                        <tr key= {id}>
                                                            <span><td>{subcomment.userSubComment}</td></span>
                                                        </tr>
                                                    )
                                                })
                                                }
                                            </td>
                                        </span>
                                        <span>
                                            <td className="d-flex justify-content-center">
                                                <form className="col-md-25" onSubmit={handleSubmit}>
                                                    <h4 className="h3 mb-3 fw-normal">Leave a SubComment!</h4>
                    
                                                    <div className="form-floating">
                                                        <input
                                                            name="UserSubComment"
                                                            type="string"
                                                            className="form-control"
                                                            placeholder="CommentHere"
                                                            required="true"
                                                            onChange={handleChange}
                                                            values={values.userSubComment}
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
                                        </span>
                                    </tr>    
                                )                   
                            })}  
                        </div>
                </tbody>
            </div>
        <div class="column" width="100%"></div>         
        <p className="mt-5 mb-3 text-muted" align="right">© 2021</p> 
        </React.Fragment>
    )
}

export default Comment;