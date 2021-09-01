import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import useForm from "../UseForm/useForm";
import Select from "react-select";


const Register = (props) => {
  const { values, handleChange, handleSubmit } = useForm(create);
  const [ redirect, setRedirect] = useState(false);
  function create() {
    props.newUser(values);
    setRedirect(true);
    <Redirect to= '/login'/>;
  }

  const options = [
    {value:"true", label: "admin"},
    {value:"false", label: "user"}
  ]
  
  return (
    <div>
      <div>
        <form className="col-md-2" onSubmit={handleSubmit} >
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>

          <div className="form-floating">
            <input
              name="FirstName"
              type="string"
              className="form-control"
              placeholder="John"
              required
              onChange={handleChange}
              values={values.firstname}
            />
            <label for="floatingInput">First Name </label>
          </div>
          <div className="form-floating">
            <input
              name="LastName"
              type="string"
              className="form-control"
              placeholder="Doe"
              onChange={handleChange}
              values={values.lastname}
            />
            <label for="floatingPassword">Last Name</label>
          </div>
          <div className="form-floating">
            <input
              name="UserName"
              type="string"
              className="form-control"
              placeholder="John123"
              onChange={handleChange}
              values={values.username}
            />
            <label for="floatingInput">User Name</label>
          </div>
          <div className="form-floating">
            <input
              name="Password"
              type="password"
              className="form-control"
              placeholder="112234344rrttyyuu"
              onChange={handleChange}
              values={values.password}
            />
            <label for="floatingInput">Password</label>
          </div>
          <div className="form-floating">
            <input
              name="Email"
              type="email"
              className="form-control"
              placeholder="name@example.com"
              onChange={handleChange}
              values={values.email}
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              name="PhoneNumber"
              type="phoneNumber"
              className="form-control"
              placeholder="555-555-5555"
              onChange={handleChange}
              values={values.phonenumber}
            />
            <label for="floatingInput">Phone Number</label>
          </div>
          <div className="form-floating" onChange={handleChange}>
            <Select
              name="identityrole"
              placeholder="select user or admin"
              options = {options}
              values={values.identityrole}
            />
            <label for="floatingInput">Role</label>
          </div>
          <div className="form-floating">
          <button className="w-10 btn btn-lg btn-primary" type="submit">
            REGISTER
          </button>
          </div>
          <p className="mt-5 mb-3 text-muted">© 2021</p>
        </form>
      </div>
    </div>
  );
};

export default Register;