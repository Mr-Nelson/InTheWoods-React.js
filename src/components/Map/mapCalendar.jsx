import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "google-maps-react";


const MapCalendar = (props) => {
    const [mapContainer, setMapContainer] = useState([]);

    useEffect (() => {
        function getEvents() {
            try
                {props.getAllEvents = async () => {
                    const jwt =localStorage.getItem("token");
                    const res = await axios.get(`https://localhost:44394/api/event`,
                {headers: { Authorization: "Bearer " + jwt }
                    })
                    console.log(res)
                    setMapContainer(res.data)}
                }
            catch(err) {
                alert(err)
            }  
        }
        getEvents();
    }, [])
    


    return (
        <GoogleMap defaultZoom = {8} defaultCenter={{lat: 43.30733170190016, lng: -96.4305045435752}}>
            {mapContainer.event.map((event) => (
                <Marker key={event.id} />
            ))}
        </GoogleMap>
      )
}

export default MapCalendar;
