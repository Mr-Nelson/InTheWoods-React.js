import React, {useState, useEffect } from 'react';
import axios from 'axios';
import useForm from '../UseForm/useForm';
import FullCalendar, { CalendarApi } from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick


const MakeCalendar = (props) => {
  const [events, setEvent] = useState([]);
  const calendar = new FullCalendar(events);
  
  useEffect (() => {
    fetchData();
    console.log(events);
    },[events.length > 0])

const fetchData = async () => {
    try {
      const res = await axios.get(`https://localhost:44394/api/event`);
      setEvent(res.data);
      calendar.render();
    }
    catch (err) {
        alert(err);
    }
}

    const handleDateClick = (events) => { // bind with an arrow function
       alert(events.eventName, events.address)
      }

    return (
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          dateClick={handleDateClick}
        />
      )
}

export default MakeCalendar;