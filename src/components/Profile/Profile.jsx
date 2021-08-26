import React from 'react';
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useForm from '../UseForm/useForm';
import axios from 'axios';

const Profile = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <h2>Profile will be here.</h2>
    );
}
export default Profile;