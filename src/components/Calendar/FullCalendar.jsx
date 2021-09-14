import React, {useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar, { CalendarApi } from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { LinearProgress } from '@material-ui/core';



const MakeCalendar = (props) => {
  const [events, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
  
    fetchData()
  
  },[])

  const fetchData =  () => {
    
      axios.get(`https://localhost:44394/api/event`).then((res)=>{
        console.log(res.data)
        setEvent(res.data);
        setIsLoading(false);
      });
      
     
    console.log(events)
    
  }

  const handleDateClick = () => { 
    alert(events.eventName, events.address)
  }
  
  const constructCalendar = () => {
    return events.map(function(event){
      return {id: event.eventId, title: event.eventName, start:event.eventDate, allDay: false}
    })
  }    

  return (
    <div>
      <br></br>
      <br></br>
      <br/>
       {!isLoading ?
    <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            dateClick={handleDateClick}
            initialEvents={constructCalendar()}
            />
            :null}
    </div>
   
  )
}

export default MakeCalendar;