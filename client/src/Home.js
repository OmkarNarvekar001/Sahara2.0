import React,{useContext, useState,useEffect} from 'react'
import {Context} from './context/Store'
import Nav from './Nav';
import Feed from './Feed';
import Left from './Left';
import Right from './Right';
import {useGeoLocation} from './hooks/useGeoLocation'
import './Home.css'
import Axios from 'axios'
import { useHistory } from "react-router-dom";

function Home() {
    const history=useHistory();
    const [state,setState]=useContext(Context)
    const location = useGeoLocation();

//check if logged in
useEffect(()=>{
    if(state.user!=null || JSON.parse(localStorage.getItem('user'))!=null || state.user!=undefined || JSON.parse(localStorage.getItem('user'))!=null){
        console.log(state.user);
        console.log("_______________________________________")
        console.log(JSON.parse(localStorage.getItem('user')));
        if(state.user==null){
            setState({user:JSON.parse(localStorage.getItem('user'))})
        }

    }
    else{
        setState({user:null});
        localStorage.setItem('user',JSON.stringify(null));
        history.push('/signin')
    }
},[state])
//check if logged in 

//update location
useEffect(() => {
if(state.user!=null){
if(location.loaded){
    Axios.put("http://localhost:3001/api/updateLocation",{_id:state.user._id,lat:location.coordinates.lat,lng:location.coordinates.lng})
            .then((response) => {
                setState({user:response.data.user})
                localStorage.setItem('user',JSON.stringify(response.data.user));
            }, (error) => {
            console.log("Cannot set location")
            });
}else{
    console.log("Location not loaded")
}
}
},[location])
//update location

    return (
        <div className="home">
            <Nav/>
            <div className='main'>
                <Left current={"home"}/>
                <Feed/>
                <Right/>
            </div>
            
        </div>
    )
}

export default Home
