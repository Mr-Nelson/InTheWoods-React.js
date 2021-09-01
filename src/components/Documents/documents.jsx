import React from 'react';
import {useState} from "react";
import useForm from '../UseForm/useForm';
import axios from 'axios';


const Document = (props) => {
    const {document, setDocument} = useState();
    const { values, handleChange, handleSubmit } = useForm(create);
    const [ redirect, setRedirect] = useState(false);
    function create() {
      props.postDocument(values);
      setRedirect(true);
      cancelCourse();
    }

    const postDocument = async (event) => {
      try{
        const jwt = localStorage.getItem("token");
          var res = await axios.post(`https://localhost:44394/api/document`, event, {headers: {Authorization: "Bearer " + jwt}});
          setDocument(res);
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
            <h1>Inwood Documents</h1>
          </div>
  
          <form id="create-course-form" className="col-md-2" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Register Document</h1>
  
            <div className="form-floating">
              <input
                name="DocumentName"
                type="string"
                className="form-control"
                placeholder="By Laws"
                required
                onChange={handleChange}
                values={values.documentname}
              />
              <label for="floatingInput">Document Name </label>
            </div>
            <div className="form-floating">
              <input
                name="DocumentDescription"
                type="string"
                className="form-control"
                placeholder="This is a letter."
                onChange={handleChange}
                values={values.documentdescription}
              />
              <label for="floatingPassword">Document Description</label>
            </div>
            <div className="form-floating">
              <input
                name="DocumentFile"
                type="link"
                className="form-control"
                placeholder=".pdf"
                onChange={handleChange}
                values={values.documentfile}
              />
              <label for="floatingPassword">Document File</label>
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
  
  export default Document;