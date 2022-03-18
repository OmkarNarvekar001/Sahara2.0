
const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../models/User');
const multer = require('multer');
const axios = require('axios');
const { IdTokenClient } = require('google-auth-library');


const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
      callback(null,"../client/public/uploads");
    },
    filename:(req,file,callback)=>{
      date=Date.now();
      callback(null,date+"_"+file.originalname);
  
    }
  })
  
  const upload=multer({storage:storage});

router.put("/update",upload.single("postImage"), async (req, res) => {
    const profilePicture=date+"_"+req.body.img;
    const name=req.body.name;
    const bio=req.body.bio;
    const hd=req.body.hd;
    const hl=req.body.hl;
    const id=req.body.userId;
    console.log(req.file.path)
    try{
        await User.findById(id,(err,updatedUser)=>{
            updatedUser.profilePicture=profilePicture;
            updatedUser.name=name;
            updatedUser.bio=bio;
            updatedUser.hd=hd;
            updatedUser.hl=hl;
            updatedUser.markModified('profilePicture','name','bio','hd','hl');
            
            updatedUser.save();
            res.status(200).json({
                user:updatedUser
            })
            console.log(updatedUser)
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
  });


  router.put("/follow", async (req, res) => {
    const user1_id=req.body.user1_id;
    const user2_id=req.body.user2_id;
    console.log(user1_id,user2_id)
    const date=Date.now();
    var user1;
    var user2;
    try{
        //push in followers of user2
        await User.findById(user2_id,(err,updatedUser)=>{
            updatedUser.followers.push({userId:user1_id, date:date})
            updatedUser.markModified('followers');
            updatedUser.save();
            user2=updatedUser;
            console.log("User who is followed",updatedUser)
        })
        //push in followings of user1
        await User.findById(user1_id,(err,updatedUser)=>{
          updatedUser.followings.push({userId:user2_id, date:date})
          updatedUser.markModified('followings');
          updatedUser.save();
          user1=updatedUser;
          console.log("User who is following",updatedUser)
      })
      res.status(200).json({
        message:"success",
        user1:user1,
        user2:user2
      })
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
  });

  router.put("/unfollow", async (req, res) => {
    const user1_id=req.body.user1_id;
    const user2_id=req.body.user2_id;
    const date=Date.now();
    var user1;
    var user2;
    try{
    //remove follows of user2
    await User.findById(user2_id,(err,updatedUser)=>{
      for (i=0;i<updatedUser.followers.length;i++){
        if(updatedUser.followers[i].userId==user1_id){
          const index = i;
          if (index > -1) {
            updatedUser.followers.splice(index, 1);
          }
        }
      }
      updatedUser.markModified('followers');
      updatedUser.save();
      user2=updatedUser;
      console.log("user who is unfollowed",updatedUser)
    })

    //remove from followings of user1
    await User.findById(user1_id,(err,updatedUser)=>{
      for (i=0;i<updatedUser.followings.length;i++){
        if(updatedUser.followings[i].userId==user2_id){
          const index = i;
          if (index > -1) {
            updatedUser.followings.splice(index, 1);
          }
        }
      }
      updatedUser.markModified('followings');
      updatedUser.save();
      user1=updatedUser;
      console.log("user who unfollowed",updatedUser);
    })

      res.status(200).json({
        message:"success",
        user1:user1,
        user2:user2
      })
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
  });

router.get('/getuser/:id',(req,res)=>{
  User.findById(req.params.id,(err,user)=>{
    if(err){
      res.send({
        message:'failure',
        error:err
      })
    }
    res.send({
      message:'success',
      user:user
    })
  })
  .catch((err)=>{
    console.log(err)
  })
})

router.get('/getfollowings/:id',async(req,res)=>{
  User.findById(req.params.id,async(err,user)=>{
    if(err){
      res.status(500).json({message:'failure',error:err})
    }
    var temp=[]
    for (let i=0;i<user.followings.length;i++){
     await axios.get(`http://localhost:3001/api/user/getuser/${user.followings[i].userId}`)
      .then((response)=>{
        temp.push({profilePicture:response.data.user.profilePicture,username:response.data.user.name,role:response.data.user.role,id:response.data.user._id});
      })
    }
    
    res.status(200).json({message:'success',followings:temp})
  })
})


module.exports=router;