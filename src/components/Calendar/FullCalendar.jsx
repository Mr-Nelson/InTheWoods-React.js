import React from 'react';
import axios from 'axios';
import useForm from '../UseForm/useForm';
import FullCalendar, { CalendarApi } from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

const MakeCalendar = (props) => {
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
   
    // const calendar = new Calendar (calendarE1, {
    //     eventSources: [
    //         res = axios.get(`https://localhost:44394/api/event`),
    //         props.setState({
    //             calendar: res.data
    //         })
    //     ]
    // })
    // CalendarApi.addEventSource(getAllEvents);

    const handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
      }

    return (
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          dateClick={handleDateClick}
          eventContent={getEvents}
        />
      )
}

export default MakeCalendar;