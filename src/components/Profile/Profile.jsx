import React from 'react';
import useForm from '../UseForm/useForm';
import { Link, Redirect } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useRetryHandler } from 'stream-chat-react';


const Profile = (props) => {
   const user = props.getUserInfo();


    

    return (
        <div>
            <div>
                <div className="row row-spacer">
                <h1>Welcome {user.firstname}</h1>
                </div>

                <table className="col-md-2">

                <div className="form-floating">
                    <td
                    name="FirstName"
                    type="string"
                    className="form-control"
                    values={user.firstname}
                    />
                    <label for="floatingInput">First Name</label>
                </div>
                <div className="form-floating">
                    <td
                    name="LastName"
                    type="string"
                    className="form-control"
                    values={props.lastname}
                    />
                    <label for="floatingPassword">Last Name</label>
                </div>
                <div className="form-floating">
                    <td
                    name="UserName"
                    type="string"
                    className="form-control"
                    values={props.username}
                    />
                    <label for="floatingInput">User Name</label>
                </div>
                <div className="form-floating">
                    <td
                    name="Password"
                    type="password"
                    className="form-control"
                    values={props.password}
                    />
                    <label for="floatingInput">Password</label>
                </div>
                <div className="form-floating">
                    <td
                    name="Email"
                    type="string"
                    className="form-control"
                    >{props.email}</td>
                    <label for="floatingInput">Email</label>
                </div>
                <div className="form-floating">
                    <td
                    name="PhoneNumber"
                    type="phoneNumber"
                    className="form-control"
                    values={props.phonenumber}
                    />
                    <label for="floatingInput">Phone Number</label>
                </div>
                <div className="form-floating">
                    <td
                    name="identityrole"
                    type="string"
                    className="form-control"
                    values={props.identityrole}
                    />
                    <label for="floatingInput">Role</label>
                </div>
                </table>
            </div>
        </div>
    );
}
export default Profile;