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






function Map() {
  const [selectedDonee, setSelectedDonee] = useState(null);
  const [doneeList,setDoneeList]=useState([]);
  useEffect(()=>{
    Axios.get("http://localhost:3001/api/readDonee").then((response)=>{
      setDoneeList(response.data)
    })
  },[])
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedDonee(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);




  //razorpay
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

async function displayRazorpay(amt) {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const result = await Axios.post("http://localhost:3001/api/payment/orders",{donorId:JSON.parse(localStorage.getItem('user'))._id,postId:"",ngoId:"",amount:amt});

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: "rzp_test_CYQ81y4KZJOjlT", 
        amount: amount.toString(),
        currency: currency,
        name: JSON.parse(localStorage.getItem('user')).name,
        description: `Paying Rs. ${amt}`,
        image: "logo.png",
        order_id: order_id,
        handler: async function (response) {
            // const data = {
            //     userId:JSON.parse(localStorage.getItem('user'))._id,
            //     courseId:course.id,
            //     amount:amt,
            //     orderCreationId: order_id,
            //     razorpayPaymentId: response.razorpay_payment_id,
            //     razorpayOrderId: response.razorpay_order_id,
            //     razorpaySignature: response.razorpay_signature
            // };

            // const result = await Axios.post("http://localhost:3001/api/payment/finalorders", data);

            // if(result.data.message=="success"){
            //     window.alert("Payment successfull")
            //     localStorage.setItem("edtech-user", JSON.stringify(result.data.user));
            //     setIsEnrolled(true)
            // }
        },
        prefill: {
            name: JSON.parse(localStorage.getItem('user')).name,
            email: JSON.parse(localStorage.getItem('user')).email
        },
        theme: {
            color: "#6366F1",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}
const pay=()=>{
  console.log('hello')
        displayRazorpay(1000)
}
//razorpay








  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: 18.924931, lng: 72.830078 }}
      // defaultOptions={{ styles: mapStyles }}
    >
      {doneeList.map(donee => (
        
        <Marker
          key={donee._id}
          position={{
            lat: donee.loc.coordinates[0],
            lng: donee.loc.coordinates[1]
          }}
          onClick={() => {
            setSelectedDonee(donee);
          }}
          icon={{
            url: ((donee.donee_type== "family" ) ? '/family.png' : '/user.png'),
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />
      ))}

      {selectedDonee && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedDonee(null);
          }}
          position={{
            lat: selectedDonee.loc.coordinates[0],
            lng: selectedDonee.loc.coordinates[1]
          }}
        >
          <div>
            <h2>{selectedDonee.name}</h2>
            <div>Help needed for: <b>{selectedDonee.help_type}</b></div>
            <div>Donations received: <b>{selectedDonee.donations}</b></div>
            <button className="follow_button" onClick={pay}><span className="button_text">Donate</span></button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function MapContainer() {
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