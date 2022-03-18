import React,{useState,useEffect} from 'react'
import Donation from './Donation'
import {timeAgo} from './functions/timeAgo'
import Axios from 'axios'
import './Donations.css'

function DonationsList({type}) {

    const [profilePicture,setProfilePicture]=useState('')
    const [caption,setCaption]=useState('');
    const [timeAgoX,setTimeAgoX]=useState('');
    const [amount,setAmount]=useState(0);
    const [username,setUsername]=useState("");
    const [madeList,setMadeList]=useState([])
    const [receivedList,setReceivedList]=useState([])
    const [currList,setCurrList]=useState([])

    






    useEffect(async ()=>{
         Axios.get(`http://localhost:3001/api/donations/made/${JSON.parse(localStorage.getItem("user"))._id}`)
        .then(async (response)=>{

            var temp=[]
            for (let i=0;i<response.data.donations_made.length;i++){
                var amount=response.data.donations_made[i].amount
                var donationTime=timeAgo(parseInt(response.data.donations_made[i].donationTime))
            await Axios.get(`http://localhost:3001/api/user/getuser/${response.data.donations_made[i].ngoId}`)
                .then((response)=>{
                    temp.push({amount:amount,donationTime:donationTime,profilePicture:response.data.user.profilePicture,name:response.data.user.name})
                    
                })
                .catch((err)=>{
                    console.log(err)
                })
            
            }
            setMadeList(temp)
            
        })
        .catch((err)=>{
            console.log(err)
        })



        Axios.get(`http://localhost:3001/api/donations/received/${JSON.parse(localStorage.getItem("user"))._id}`)
        .then(async (response)=>{

            var temp1=[]
            for (let i=0;i<response.data.donations_received.length;i++){
                var amount=response.data.donations_received[i].amount
                var donationTime=timeAgo(parseInt(response.data.donations_received[i].donationTime))
            await Axios.get(`http://localhost:3001/api/user/getuser/${response.data.donations_received[i].donorId}`)
                .then((response)=>{
                    temp1.push({amount:amount,donationTime:donationTime,profilePicture:response.data.user.profilePicture,name:response.data.user.name})
                    
                })
                .catch((err)=>{
                    console.log(err)
                })
            
            }
            setReceivedList(temp1)
            
        })
        .catch((err)=>{
            console.log(err)
        })
    
    },[])

    useEffect(()=>{
        if(type=="made"){
            setCurrList(madeList)
        }else{
            setCurrList(receivedList)
        }
    },[receivedList,madeList,type])

    return (
        <div className="donation_list">
            
            {currList.map(donation=>(
                <Donation 
                    profilePicture={donation.profilePicture}
                    username={donation.name}
                    donationTime={donation.donationTime}
                    amount={donation.amount}
                />
            ))}
        </div>
    )
}

export default DonationsList
