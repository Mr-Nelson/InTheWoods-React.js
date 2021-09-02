import React, { useState} from 'react'
import useForm from '../UseForm/useForm';
import axios from 'axios';


const EventCalendar = (props) => {
    const {event, setEvent} = useState();
    const{values, handleChange, handleSubmit} = useForm(logEvent);
    function logEvent() {
        postEvent(values);
        cancelCourse();
      }

      const postEvent = async (event) => {
        try{
          const jwt = localStorage.getItem("token");
            var res = await axios.post(`https://localhost:44394/api/event`, event, {headers: {Authorization: "Bearer " + jwt}});
            setEvent(res);
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
            <h1>Event Registration</h1>
          </div>
  
          <form id="create-course-form" className="col-md-2" onSubmit={handleSubmit}>
            <h2 className="h3 mb-3 fw-normal">Please register event here.</h2>
  
            <div className="form-floating">
              <input
                name="EventDate"
                type="string"
                className="form-control"
                placeholder="2021/08/31 12:30:00"
                onChange={handleChange}
                values={values.eventdate}
              />
              <label for="floatingInput">Event Date</label>
            </div>
            <div className="form-floating">
              <input
                name="EventName"
                type="string"
                className="form-control"
                placeholder="Expo"
                required
                onChange={handleChange}
                values={values.eventname}
              />
              <label for="floatingInput">Event Name </label>
            </div>
            <div className="form-floating">
              <input
                name="EventLocation"
                type="string"
                className="form-control"
                placeholder="123 ABC St., Somewhere, Somestate"
                onChange={handleChange}
                values={values.eventlocation}
              />
              <label for="floatingPassword">Event Location</label>
            </div>
            <div className="form-floating">
            <button className="w-10 btn btn-lg btn-primary" type="submit">
              REGISTER EVENT
            </button>
            </div>
            <p className="mt-5 mb-3 text-muted">© 2021</p>
          </form>
        </div>
      </div>
    );
};

export default EventCalendar;