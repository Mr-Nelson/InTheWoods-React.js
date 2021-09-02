import React from 'react';
import { Redirect } from 'react-router';


const Logout = (props) => {
    return (
        <React.Fragment>
            {localStorage.removeItem("token")}
            <Redirect to= "./login" /> 
        </React.Fragment>
    )
}

export default Logout;