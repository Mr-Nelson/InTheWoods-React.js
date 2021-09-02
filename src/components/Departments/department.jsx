import React, { useState, useEffect, useContext } from 'react';
import useForm from '../UseForm/useForm';
import axios from 'axios';
import userEvent from '@testing-library/user-event';


const Department = (props) => {
    const {department, setDepartment} = useState();
    const { values, handleChange, handleSubmit } = useForm(create);
    const [ redirect, setRedirect] = useState(false);
    function create() {
      postDepartment(values);
      cancelCourse();
    }

    const postDepartment = async (event) => {
      try{
        const jwt = localStorage.getItem("token");
          var res = await axios.post(`https://localhost:44394/api/department`, event, {headers: {Authorization: "Bearer " + jwt}});
          setDepartment(res);
      }
      catch(err){
          alert(err);
      }
    }  

    const cancelCourse = () => {
      document.getElementById("create-course-form").reset();
    }
  
    return (
      <div>
        <div>
          <div className="row row-spacer">
            <h1>Departments</h1>
          </div>
  
          <form id="create-course-form" className="col-md-2" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please Register</h1>
  
            <div className="form-floating">
              <input
                name="Company"
                type="string"
                className="form-control"
                placeholder="Inwood City Hall"
                required
                onChange={handleChange}
                values={values.company}
              />
              <label for="floatingInput">Company Name </label>
            </div>
            <div className="form-floating">
              <input
                name="Address"
                type="string"
                className="form-control"
                placeholder="123 Main St, Inwood, IA 51240"
                onChange={handleChange}
                values={values.address}
              />
              <label for="floatingPassword">Address</label>
            </div>
            <div className="form-floating">
              <input
                name="Hours"
                type="string"
                className="form-control"
                placeholder="9AM - 4PM"
                onChange={handleChange}
                values={values.hours}
              />
              <label for="floatingInput">Hours</label>
            </div>
            <div className="form-floating">
              <input
                name="ManagerName"
                type="string"
                className="form-control"
                placeholder="City Clerk: Jane Doe"
                onChange={handleChange}
                values={values.managername}
              />
              <label for="floatingInput">Manager Name</label>
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

  export default Department;