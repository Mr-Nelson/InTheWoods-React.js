import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import {Map,GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import './map.css';


export class MapContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            events: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
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
            onClick={this.onMarkerClick}
            name={occasion.eventName} />
        });
    }

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
        }
    };

  render(){
    return(
        <Map
        google ={this.props.google}
        zoom = {14}
        style={{ width: '100%',
        height: '100%'}}
        initialCenter={{lat: 43.305112, lng: -96.432149}}>
        {this.displayMarkers()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
        </Map>
    )
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDh6A6X-LRCTfF57FUpDFP56syHXGkm3sY'
})(MapContainer)        