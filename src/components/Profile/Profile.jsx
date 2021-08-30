import React from 'react';
import useForm from '../UseForm/useForm';
import { Link, Redirect } from 'react-router-dom';


const Profile = (props) => {
    const { values, handleChange, handleSubmit } = useForm(getUserInfo); 
    function getUserInfo() {
        props.getUserInfo(values);
    }

    return (
        <div>
            <div>
                <div className="row row-spacer">
                <h1>Welcome {props.firstname}</h1>
                </div>

                <table className="col-md-2">

                <div className="form-floating">
                    <td
                    name="FirstName"
                    type="string"
                    className="form-control"
                    values={props.firstname}
                    />
                    <label for="floatingInput">First Name </label>
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
                    type="email"
                    className="form-control"
                    >{props.email}</td>
                    <label for="floatingInput">{values.email}</label>
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
                    values={props.identityrole}
                    />
                    <label for="floatingInput">Role</label>
                </div>
                <p className="mt-5 mb-3 text-muted">© 2021</p>
                </table>
            </div>
        </div>
    );
}
export default Profile;