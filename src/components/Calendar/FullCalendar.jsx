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
      const jwt =localStorage.getItem("token");
      const res = await axios.get(`https://localhost:44394/api/event`,
   {headers: { Authorization: "Bearer " + jwt }
      })
      var events = res.data;
      setEvent(events);
    }
    catch (err) {
        alert(err);
    }
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
          eventContent={events}
        />
      )
}

export default MakeCalendar;