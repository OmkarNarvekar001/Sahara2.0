import React,{useState,useEffect} from 'react'
import { Avatar } from '@material-ui/core';
import './Donation.css'
import Axios from 'axios'
import {timeAgo} from './functions/timeAgo'

function Donation(props) {


    console.log(props.profilePicture)
    return (
        <div className="donation_main">
            <Avatar alt="profile picture" src={props.profilePicture==""?'/uploads/profile.jpg':`/uploads/${props.profilePicture}`} style={{width:'100px',height:'100px'}} className="donation_avatar"/>
            <div className="donation_username">{props.username}</div>
            <div className="donation_time">{props.donationTime}</div>
            <div className="donation_amount">Rs. {props.amount} /-</div>
        </div>
    )
}

export default Donation
