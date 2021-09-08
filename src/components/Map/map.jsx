import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import './map.css';


const Map = (props) => {
    const [events, setEvent] = useState([]);
    const [eventLocation, setEventLocation] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [latLong, setLatLong] = useState([]);
    
    const WrappedMap = withGoogleMap((map) => 
    <GoogleMap
        defaultZoom= {14}
        defaultCenter={{ lat: 43.305112, lng: -96.432149 }}
        >
            {events.map(event => (
              <Marker
              key={event.eventId}
              position={event.eventLocation}  
              onClick= {() => {setSelectedEvent(event);}} />
            ))};
            {selectedEvent && (
                <InfoWindow
                position={selectedEvent.eventLocation}
                >
                    <div>event.description</div>
                </InfoWindow>
            )}  
        </GoogleMap>    
        );
    useEffect (() => {
        fetchData();
        // if (events.length > 0) {
        //     mapEvents();
        // }
        // console.log(eventLocation);
        // if (eventLocation != null) {
        //     geocode();
        // }
        // console.log(geocode);
    }, [events.length > 0])

    const fetchData = async () => {
        try{
            const res = await axios.get(`https://localhost:44394/api/event`)
            // console.log(res)
            setEvent(res.data)
        }
        catch(err) {
            alert(err)
        }}

    // function mapEvents () {
    //     const eventLocation = events.map((event)=>
    //         <ul key={event.eventId}
    //         value={event.eventLocation}       
    //         />
    //     );
    //     return (
    //         setEventLocation(eventLocation)
    //     )
    // }
    // function geocode (eventLocation) {
    //     var res = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${eventLocation}&key=AIzaSyDh6A6X-LRCTfF57FUpDFP56syHXGkm3sY`) 
    //     setLatLong(res.data);
    //     // console.log(latLong);
    // }

    return (
        <div style={{width: "100vw", height: "100vh"}}>
            <div id="Inwood Events" />
            <WrappedMap
                googleMapURL ={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDh6A6X-LRCTfF57FUpDFP56syHXGkm3sY`}
                loadingElement={<div style={{ height: "100%" }}/>}
                containerElement={<div style={{ height: "100%" }}/>}
                mapElement={<div style={{ height: "100%" }}/>}
            />
        </div>
    )
};
export default Map;