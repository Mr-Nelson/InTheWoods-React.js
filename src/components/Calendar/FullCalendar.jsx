import React, {useState, useEffect } from 'react';
import axios from 'axios';
import useForm from '../UseForm/useForm';
import FullCalendar, { CalendarApi } from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick


const MakeCalendar = (props) => {
  const [events, setEvent] = useState([]);
  
  useEffect (() => {
    fetchData();
    console.log(events);
    },[events.length > 0])

const fetchData = async () => {
    try {
      const res = await axios.get(`https://localhost:44394/api/event`);
      setEvent(res.data);
    }
    catch (err) {
        alert(err);
    }
}

    const handleDateClick = (event) => { // bind with an arrow function
       alert(event.eventName, event.address)
      }

    return (
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          dateClick={handleDateClick}
          eventContent={events}
          />
      )
}

export default MakeCalendar;