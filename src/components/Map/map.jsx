import React, { useState } from 'react';
import axios from 'axios';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import './map.css';
import MapCalendar from './mapCalendar';



const Map = (props) => {
    const [map, setMap] = useState();
    const additionalOptions = [];
    const WrappedMap = withGoogleMap((map) => 
    <GoogleMap
        defaultZoom= {14}
        defaultCenter={{ lat: 43.305112, lng: -96.432149 }}
        />);
    // const loader = async () => {
    //     var loader = await ( new Loader({
    //     apiKey: "AIzaSyDh6A6X-LRCTfF57FUpDFP56syHXGkm3sY",
    //     version: "weekly",
    //     ...additionalOptions,
    //   }));
    //   loader.load =  (() => {
    //       var google = (new google.maps.Map(document.getElementById("Inwood Events"), {
    //       center: { lat: 43.30733170190016, lng: -96.4305045435752 },
    //       zoom: 8,
    //     }));
    //     setMap(google.data)
    //   });}

    return (
        <div style={{width: "100vw", height: "100vw"}}>
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