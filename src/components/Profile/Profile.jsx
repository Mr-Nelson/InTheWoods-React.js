import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Profile = (props) => {
    const [user, setUser] = useState([])
    
    useEffect (() => {
        fetchData();
        console.log(user);
        },[user.length > 0])



    const fetchData = async () => {
        const jwt = localStorage.getItem('token');
        const res = await axios.get(
          `https://localhost:44394/api/user`, {headers: {Authorization: 'Bearer ' + jwt}});
        var user = res.data;
        setUser(user);
    }

    return (
        <div>
            <div>
                <div className="row row-spacer">
                <h1>Welcome {user.firstName}</h1>
                </div>

                <table className="col-md-2">

                <div className="form-floating">
                    <td
                    name="FirstName"
                    type="string"
                    className="form-control"
                    values={user.firstname}
                    />
                    <label for="floatingInput">{user.firstName}</label>
                </div>
                <div className="form-floating">
                    <td
                    name="LastName"
                    type="string"
                    className="form-control"
                    values={user.lastname}
                    />
                    <label for="floatingPassword">{user.lastName}</label>
                </div>
                <div className="form-floating">
                    <td
                    name="UserName"
                    type="string"
                    className="form-control"
                    values={user.username}
                    />
                    <label for="floatingInput">{user.userName}</label>
                </div>
                {/* <div className="form-floating">
                    <td
                    name="Password"
                    type="password"
                    className="form-control"
                    values={user.password}
                    />
                    <label for="floatingInput">{user.password}</label>
                </div> */}
                <div className="form-floating">
                    <td
                    name="Email"
                    type="string"
                    className="form-control"
                    values={user.email}
                    />
                    <label for="floatingInput">{user.email}</label>
                </div>
                <div className="form-floating">
                    <td
                    name="PhoneNumber"
                    type="phoneNumber"
                    className="form-control"
                    values={user.phonenumber}
                    />
                    <label for="floatingInput">{user.phoneNumber}</label>
                </div>
                {/* <div className="form-floating">
                    <td
                    name="identityrole"
                    type="string"
                    className="form-control"
                    values={user.identityrole}
                    />
                    <label for="floatingInput">{user.identityRole}</label>
                </div> */}
                </table>
            </div>
        </div>
    );
}
export default Profile;