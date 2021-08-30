import React from 'react';
import axios from 'axios';
import './map.css';
import useForm from '../UseForm/useForm';


const MapCalendar = (props) => {
    const { values, handleChange, handleSubmit } = useForm(getEvents);
    function getEvents() {
        props.getAllEvents = async () => {
            const jwt =localStorage.getItem("token");
            const res = await axios.get(`https://localhost:44394/api/event`,
         {headers: { Authorization: "Bearer " + jwt }
            })
            console.log(res)
            .then(res => props.events=res.data)
            console.log(props.events)
            return(
                    <>
                    <b>{props.events.eventdate}</b>
                    <i>{props.events.eventname}</i>
                    <i>{props.events.eventlocation}</i>
                    </>
            )
            .catch(err => console.log(err))    
            };
    }

    return (
        <div Id="INWOOD_IA"></div>
      )
}

export default MapCalendar;