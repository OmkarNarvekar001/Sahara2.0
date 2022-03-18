import React,{useState,useEffect,useContext} from 'react'
import './Profile.css'
import Nav from './Nav'
import Posts from './Posts'
import ProfileMapContainer from './ProfileMapContainer'
import { Avatar } from '@material-ui/core';
import LineChart from './LineChart'
import {SocialMediaIconsReact} from 'social-media-icons-react';
import{BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { Modal } from '@material-ui/core';

function Profile({match}) {
    const history=useHistory();
    const [userId,setUserId]=useState(match.params.id)
    const [postList,setPostList]=useState([])
    const [location,setLocation]=useState([]);
    const [username,setUsername]=useState("")
    const [open, setOpen] = useState(false);
    const [amount,setAmount]= useState(0);
    const [body,setBody]=useState("body1")
    const [userState,setUserState]=useState({
        username:"",
        role:"",
        email:"",
        phone:"",
        followers:[],
        followings:[],
        donations_made:[],
        lat:0,
        lng:0,
        profilePicture:"",
        bio:"",
        hd:false,
        hl:false,

    })
    const [x,setX]=useState([]);
    const [y,setY]=useState([]);
    const [isFollowing,setIsFollowing]=useState(false)
    
    useEffect(()=>{
        var amount=[]
        var date=[]
        for(let i=0;i<userState.donations_made.length;i++){
            amount.push(userState.donations_made[i].amount)
            date.push(new Date(userState.donations_made[i].donationTime).toJSON().slice(0,10).replace(/-/g,'/'))
        } 
        setX(date);
        setY(amount);
    },[userState])

    //get users posts
    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/post/${userId}`).then((response)=>{
            console.log(response)
            if(response.data.message="success"){
                setPostList(response.data.posts)
            }
        })
      },[])
      //get users posts

    //get user from userid
    useEffect(async()=>{
        Axios.get(`http://localhost:3001/api/readUser/${userId}`).then((response)=>{
            if(response.data.message="success"){
                setUserState({
                    username:response.data.user.name,
                    role:response.data.user.role,
                    email:response.data.user.email,
                    phone:response.data.user.phone,
                    followers:response.data.user.followers,
                    followings:response.data.user.followings,
                    donations_made:response.data.user.donations_made,
                    lat:response.data.user.loc.coordinates[0],
                    lng:response.data.user.loc.coordinates[1],
                    profilePicture:response.data.user.profilePicture,
                    bio:response.data.user.bio,
                    hd:response.data.user.hd,
                    hl:response.data.user.hl,


                });
                
            }
        })
        console.log("hello")
      },[isFollowing])
      //get user from userid

      

      useEffect(()=>{
        for(let i=0;i<userState.followers.length;i++){
            if(userState.followers[i].userId==JSON.parse(localStorage.getItem('user'))._id){
                setIsFollowing(true)
            }
        }
      },[userState])

      const follow_user=()=>{
          console.log("hello")
        if(!isFollowing){  
        Axios.put(`http://localhost:3001/api/user/follow`,{
            user1_id:JSON.parse(localStorage.getItem('user'))._id,
            user2_id:userId,
        }).then((response)=>{
            console.log(response)
            if(response.data.message="success"){
                setIsFollowing(true)
                
            }
        })
      }
      else if(isFollowing){
        Axios.put(`http://localhost:3001/api/user/unfollow`,{
            user1_id:JSON.parse(localStorage.getItem('user'))._id,
            user2_id:userId,
        }).then((response)=>{
            console.log(response)
            if(response.data.message="success"){
                setIsFollowing(false)
            }
        })
      }
    }























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

    const result = await Axios.post("http://localhost:3001/api/payment/orders",{donorId:JSON.parse(localStorage.getItem('user'))._id,postId:"",ngoId:userId,amount:amt});

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
        description: `Donation to ${username}`,
        image: "logo.png",
        order_id: order_id,
        handler: async function (response) {
            const data = {
                donorId:JSON.parse(localStorage.getItem('user'))._id,
                postId:"",
                ngoId:userId,
                amount:amt,
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature
            };

            const result = await Axios.post("http://localhost:3001/api/payment/finalordersprofile", data);

            if(result.data.message=="success"){
                setBody("body2")
                setOpen(true)
            }
        },
        prefill: {
            name: JSON.parse(localStorage.getItem('user')).name,
            email: JSON.parse(localStorage.getItem('user')).email,
            contact: JSON.parse(localStorage.getItem('user')).phone,
        },
        // notes: {
        //     address: "Soumya Dey Corporate Office",
        // },
        theme: {
            color: "#4267B2",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}
//razorpay
const body2_text=`Donation of ₹ ${amount} made to ${username} 🥳🎉`;
          //make payment
    const pay=()=>{
        console.log(amount)
        setOpen(false)
        displayRazorpay(amount)
    }
    //make payment

    //share success
    const share_success=async()=>{
        const data={
        userId:JSON.parse(localStorage.getItem('user'))._id,
        ngoId:userId,
        caption:body2_text
        };
        const result = await Axios.post("http://localhost:3001/api/post/sharesuccess", data);
        setOpen(false)
        history.push("/")
    }
    const dont_share_success=()=>{
        setOpen(false);
        setBody("body1");
        history.push("/")
    }
    //share success

    //modal
    function rand() {
        return Math.round(Math.random() * 20) - 10;
      }
      
      function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();
      
        return {
          top: `${50}%`,
          left: `${50}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }
      
      const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 300,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
      const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    
      
        const handleOpen = () => {
                setOpen(true);
            
        };
      
        const handleClose = () => {
            setBody("body1")
            setOpen(false);  
        };

        const body1 = (
            <div style={modalStyle} className={classes.paper}>
              <div>
                  <h1>Donate to {username}</h1>
                  <TextField onChange={(event)=>{setAmount(event.target.value)}} id="outlined-basic" label="Amount" variant="outlined" />
                  <br/>
                  <button onClick={pay} className="modal_button">Donate</button>
              </div>
            </div>
          );
          const body2 = (
            <div style={modalStyle} className={classes.paper}>
              <div>
                  <div className="share_donation_post">
                    {body2_text}
                  </div>
                  <div>Share it as a post?</div>
                  <button className="modal_button" onClick={(body2_text)=>{share_success(body2_text)}}>Yes</button>
                  <button className="modal_button" style={{marginLeft:10}} 
                  onClick={dont_share_success}>No</button>
              </div>
            </div>
          );
      //modal
      
































    
    return (
        <div className="profile_page">
            <Nav/>
            <div className="profile_page_main">
                <div className="profile_page_1">
                    <div className="profile_page_1_1">
                    {userState.profilePicture==""?
                    <Avatar alt="Remy Sharp" src="/uploads/profile.jpg" style={{width:'200px',height:'200px'}} className="profile_page_avatar"/>
                    :
                    <Avatar alt="Remy Sharp" src={`/uploads/${userState.profilePicture}`} style={{width:'200px',height:'200px'}} className="profile_page_avatar"/>
                    }
                    <div className="profile_page_1_datas">

                        <div className="profile_page_1_data">
                            <div className="data_count">{userState.donations_made.length}</div>
                            <div>Donations</div>
                        </div>

                        <div className="profile_page_1_data">
                            <div className="data_count">{postList.length}</div>
                            <div>Posts</div>
                        </div>

                        <div className="profile_page_1_data">
                            <div className="data_count">{userState.followers.length}</div>
                            <div>Followers</div>
                        </div>

                        <div className="profile_page_1_data">
                            <div className="data_count">{userState.followings.length}</div>
                            <div>Following</div>
                        </div>

                    </div>
                    {JSON.parse(localStorage.getItem('user'))._id==userId?<div></div>:
                    <div >
                        <button className="follow_button" onClick={follow_user}><span className="button_text">{isFollowing?"Unfollow":"Follow"}</span></button>
                        {userState.role=="organization"?
                        <button className="follow_button" onClick={handleOpen}><span className="button_text">Donate</span></button>
                        :<div></div>
                        }
                        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                    {body=="body1"?body1:body2}
                </Modal>
                    </div>
                    }   
                    </div>
                
                    
                     
                </div>

                <div className="profile_page_2">
                    <div className="profile_bio">
                    <div className="profile_username">{userState.username}</div>
                    <div className="profile_text">{userState.bio}</div>
                    <div className="profile_icons">
                    <span ><a style={{textDecoration:'none',color:'rgb(66,103,178)'}} href={`mailto:${userState.email}`}>{userState.email}</a></span>
                    </div>
                    
                    
                    </div>
                    {!userState.hl?
                    <div className="map_container">
                        <ProfileMapContainer lat={userState.lat} lng={userState.lng} profilePicture={userState.profilePicture} />
                    </div> 
                    :<div></div>}
                    {!userState.hd?
                    <div className="chart_container">
                        <LineChart y={y} x={x}/>
                    </div>
                    :<div></div>}
                    <div className="profile_posts">
                        <Posts postList={postList}/>
                    </div>  
                    
                </div>
            </div>
        </div>
    )
}

export default Profile
