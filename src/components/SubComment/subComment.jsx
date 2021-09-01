import React from 'react';
import useForm from '../UseForm/useForm'


const SubComment = (props) => {
    const {values, handleChange, handleSubmit} = useForm(create);
    function create () {
        props.postSubComment(values);
        console.log(values)
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
                            <td className="d-flex justify-content-center">
                            <form id="create-course-form" className="col-md-25" onSubmit={handleSubmit}>
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
                        </div>
                        {/* <div className="feed" align="center">
                            {props.subComments.map((subcomment, id) => {
                                <div key={id} value={subcomment} />
                                return (
                                    <tr className="table-row" key= {id}>
                                        <span>
                                            <td>{subcomment.userSubComment}</td>
                                        </span>
                                    </tr>    
                                )                   
                            })}  
                        </div> */}
                </tbody>
            </div>
        </React.Fragment>
    )
}

export default SubComment;