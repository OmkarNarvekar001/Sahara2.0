
const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../models/User');

router.put("/", async (req, res) => {
    const lat=req.body.lat;
    const lng=req.body.lng;
    const id=req.body._id;
    console.log(lat,lng,id)
    try{
        await User.findById(id,(err,updatedUser)=>{
            console.log(updatedUser)
            updatedUser.loc.coordinates[0]=lat;
            updatedUser.loc.coordinates[1]=lng;
            updatedUser.markModified('loc');
            updatedUser.save();
            res.status(200).json({
                user:updatedUser
            })
            console.log(updatedUser)
        })
    }catch(err){
        res.status(500).json({
            error:err
        })
    }
  });

module.exports=router;