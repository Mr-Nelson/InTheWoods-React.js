import React from 'react';
import axios from 'axios';
import useForm from '../UseForm/useForm';

export const Feed = (props) => {
    const {values, handleChange, handleSubmit} = useForm(create);
    function create () {
        props.getAllComments();
        props.getAllSubComments();
    }

    return (
        <div className="post">
            {props.comments.map((comment, id) => {
                <div key={id} value={comment} />
                return (
                    <div className="feed">
                        {comment}
                    </div>
                )
            })}
        </div>
    )
}