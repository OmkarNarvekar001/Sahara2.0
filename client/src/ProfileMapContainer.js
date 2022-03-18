//AIzaSyAin1vQsxhh5S2t0cP8UiVrNh0YBWWOpok
// import React from 'react';
// import { GoogleMap, LoadScript , Marker} from '@react-google-maps/api';
// function MapContainer()  {
  
//   const mapStyles = {        
//     height: "100%",
//     width: "100%"};
  
//   const defaultCenter = {
//     lat: 18.924930, lng: 72.830080
//   }
  
//   return (
//      <LoadScript
//        googleMapsApiKey='AIzaSyAin1vQsxhh5S2t0cP8UiVrNh0YBWWOpok'>
//         <GoogleMap
//           mapContainerStyle={mapStyles}
//           zoom={13}
//           center={defaultCenter}
//         />
//         <Marker lat={19.074300} lng={72.827890} />
//      </LoadScript>
//   )
// }

// export default MapContainer;


import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import Axios from 'axios';
// import * as parkData from "./data/skateboard-parks.json";
// import mapStyles from "./mapStyles";



export default function ProfileMapContainer({lat,lng,profilePicture}) {

    function Map() {
        
      
        return (
          <GoogleMap
            defaultZoom={16}
            defaultCenter={{ lat: lat, lng: lng }}
            // defaultOptions={{ styles: mapStyles }}
          >
            
              
              <Marker
                position={{
                  lat: lat,
                  lng: lng
                }}
                icon={{
                  url: ((profilePicture=="")?'/uploads/profile.jpg' : `/uploads/${profilePicture}`),
                  scaledSize: new window.google.maps.Size(30, 30)
                }}
              />
            
      
            
          </GoogleMap>
        );
      }
      
      const MapWrapped = withScriptjs(withGoogleMap(Map));   
    

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAin1vQsxhh5S2t0cP8UiVrNh0YBWWOpok`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}