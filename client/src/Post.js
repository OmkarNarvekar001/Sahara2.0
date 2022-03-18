import React,{useEffect,useState,useContext} from 'react'
import './Post.css'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import RoomIcon from '@material-ui/icons/Room';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ShowMoreText from "react-show-more-text";
import { IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import {Context} from './context/Store'
import {timeAgo} from './functions/timeAgo'
import Axios from 'axios'
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ShareIcon from '@material-ui/icons/Share';
import { useHistory } from "react-router-dom";
import {
    BrowserRouter as Router,
    Link,
    Route
  } from "react-router-dom";

function Post({_id,userId,img,createdAt,caption,donations,likes,post_type}) {
    const history=useHistory();
    //states
    const [state,setState]=useContext(Context)
    const [username,setUsername]=useState("")
    const [role,setRole]=useState("")
    const [like,setLike]=useState(false)
    const [noOfLikes,setNoOfLikes]=useState(likes.length)
    const [open, setOpen] = useState(false);
    const [amount,setAmount]= useState(0);
    const [body,setBody]=useState("body1")
    const [successText,setSuccessText]=useState("")
    const [donationAmount,setDonationAmount]=useState(0);
    const [image,setImage]=useState(img)
    const [ago,setAgo]=useState(0)
    const [profilePicture,setProfilePicture]=useState("")
    useEffect(()=>{
        setAgo(timeAgo(parseInt(img.split("_")[0])))
        var sum=0
        for (let i=0;i<donations.length;i++){
            sum=sum+parseInt(donations[i].amount);
        }
        setDonationAmount(sum)
    },[ago])


    //states

    const get_donations=()=>{
        var sum=0
    for(let i=0;i<donations.length;i++){
        sum=sum+donations[i].amount;
    }
    setDonationAmount(sum)
    console.log(sum)
    return sum
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

        const result = await Axios.post("http://localhost:3001/api/payment/orders",{donorId:JSON.parse(localStorage.getItem('user'))._id,postId:_id,ngoId:userId,amount:amt});

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_CYQ81y4KZJOjlT", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: JSON.parse(localStorage.getItem('user')).name,
            description: `Donation to ${username}`,
            image: "logo.png",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    donorId:JSON.parse(localStorage.getItem('user'))._id,
                    postId:_id,
                    ngoId:userId,
                    amount:amt,
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature
                };

                const result = await Axios.post("http://localhost:3001/api/payment/finalorders", data);

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

    

    //get user from userid
    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/readUser/${userId}`).then((response)=>{
            if(response.data.message="success"){
                setUsername(response.data.user.name)
                setRole(response.data.user.role)
                setProfilePicture(response.data.user.profilePicture)
                
            }
        })
      },[])
      //get user from userid

      //check if liked or not
      useEffect(()=>{
          if(likes.includes(JSON.parse(localStorage.getItem('user'))._id)){
            setLike(true)
          }
          else{
            setLike(false)
          }
      },[likes])
      //check if liked or not

      //change like
      const changeLike=()=>{
        if(like){
            Axios.put(`http://localhost:3001/api/post/dislike`,{userId:JSON.parse(localStorage.getItem('user'))._id,postId:_id}).then((response)=>{
            if(response.data.message="success"){
                setLike(false)
                setNoOfLikes(response.data.post.likes.length)
            }
        })
        }
        else{
            Axios.put(`http://localhost:3001/api/post/like`,{userId:JSON.parse(localStorage.getItem('user'))._id,postId:_id}).then((response)=>{
            if(response.data.message="success"){
                setLike(true)
                setNoOfLikes(response.data.post.likes.length)
            }
        })
    }
}
      //change like
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
        ngoId:_id,
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
            if(post_type=="request"){
                setOpen(true);
            }
            else{

            }
            
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
        
        <div className="post">
            <div className="post_header">

            <Avatar alt="profile picture" src={profilePicture==""?`/uploads/profile.jpg`:`/uploads/${profilePicture}`} style={{width:'30px',height:'30px'}} className="post_avatar"/>

            <Link to={`/profile/${userId}`} style={{ textDecoration: 'none', color:'black' }}>
            <div className="post_head">
                <div className="post_username">{username}</div>
                <span className="post_user_role">{role}</span>
            </div>
            </Link>

            <div className="time_ago">&bull;{ago}</div>

            </div>
            <img className="post_image" src={`/uploads/${image}`} alt="" />
            <div className="post_icons">
                <div className="post_icons_col">
                    <ThumbUpIcon style={like ? {color: '#3F51B5'} : {color:'rgb(140,140,140)'}} onClick={changeLike} className="post_icon"/>
                <div className="post_icon_count">{noOfLikes}</div>
                </div>
                {post_type=="request"?
                <div className="post_icons_col" style={{marginLeft:20}}>
                    <MonetizationOnIcon onClick={handleOpen} className="post_icon"/>
                <div className="post_icon_count">₹{donationAmount}</div>
                </div>
                :<div></div>}
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                    {body=="body1"?body1:body2}
                </Modal>
                <div className="divider_line"></div>
                <div className="post_caption">
                <Link to={`/profile/${userId}`} className="post_main_caption">
                    {username}&nbsp;&nbsp;
                </Link>
                    {caption}</div>
            </div>
            
        </div>
    )
}

export default Post
