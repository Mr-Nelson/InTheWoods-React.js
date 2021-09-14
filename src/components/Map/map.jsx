import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

//import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import {Map,GoogleApiWrapper, Marker} from 'google-maps-react'
import './map.css';
import { LinearProgress } from '@material-ui/core';


export class MapContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            events: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const res = axios.get(`https://localhost:44394/api/event`).then((res)=>{
            this.setState ({
                events:res.data
        })
        })
        console.log(this.events)
    }

    displayMarkers = () => {
        return this.state.events.map((occasion, eventId) => {
          return <Marker key={eventId} id={occasion.eventName} position={{
            lat: parseFloat(occasion.lat),
            lng: parseFloat(occasion.long)
         }} 
         onClick={occasion.eventDate} />
        });
        //       {console.log(events)}
        //       {selectedEvent && (
        //           <InfoWindow
        //           position={selectedEvent.eventLocation}
        //           >
        //               <div>{selectedEvent.description}</div>
        //           </InfoWindow>
            //   )}
    }
    // const [events, setEvent] = useState([]);
    // const [selectedEvent, setSelectedEvent] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    
    // const WrappedMap = withGoogleMap((map) => 
    // <GoogleMap
    //     defaultZoom= {14}
    //     defaultCenter={{ lat: 43.305112, lng: -96.432149 }}
    //     >
    //         {events.map(event => (
    //           <Marker
    //           key={event.eventId}
    //           position={{
    //               lat: parseFloat(events.lat),
    //               lng: parseFloat(events.long)
    //           }}  
              
    //     </GoogleMap>    
    //     );

  render(){
    return(
        <Map
        google ={this.props.google}
        zoom = {14}
        style={{ width: '100%',
        height: '100%'}}
        initialCenter={{lat: 43.305112, lng: -96.432149}}>
        {this.displayMarkers()}
        </Map>
    )
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDh6A6X-LRCTfF57FUpDFP56syHXGkm3sY'
})(MapContainer)        