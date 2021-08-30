import React from 'react';
import {useState} from "react";
import useForm from '../UseForm/useForm';
import axios from 'axios';


const Department = (props) => {
    const [show, setShow] = useState(false);  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);   
    const{values, handleChange, handleSubmit} = useForm(documentDetails);
    function documentDetails() {
        getDocumentation();
    } 

    const getDocumentation = async (event) => {
        const jwt =localStorage.getItem("token");
        const res = await axios.post(`https://localhost:44394/api/department`,
    event, {headers: { Authorization: "Bearer " + jwt }
        })
        .then(res => {
                var documents = res.data
        })
        .catch(err => console.log(err))    
        };

    return (
        <h2> Here are the departments.</h2>
    )
}

export default Department;