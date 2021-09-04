import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import './map.css';


const Map = (props) => {
    const [event, setEvent] = useState({Events: []});
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    const WrappedMap = withGoogleMap((map) => 
    <GoogleMap
        defaultZoom= {14}
        defaultCenter={{ lat: 43.305112, lng: -96.432149 }}
        >
         {event.Events.map((event) => {
             <Marker key={event.id} position={event.address} onClick= {() => {setSelectedEvent(event);}} />
         })} 
         {selectedEvent && (
             <InfoWindow>
                 <div>event.description</div>
             </InfoWindow>
         )}  
        </GoogleMap>    
        );
    useEffect (() => {
        fetchData();
    }, [event.length > 0])

    const fetchData = async () => {
        try{
            const res = await axios.get(`https://localhost:44394/api/event`)
            console.log(res)
            setEvent(res.data)
        }
        catch(err) {
            alert(err)
        }}  

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