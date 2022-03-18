const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../models/User');
const multer = require('multer');


router.get('/made/:userId',async(req,res,next)=>{
  User.findById(req.params.userId,(err,result)=>{
    res.send({message:"success",donations_made:result.donations_made});
  }).catch((err)=>{
    console.log(err);
    res.send({message:"failure",error:err});
  }) 
})

router.get('/received/:userId',async(req,res,next)=>{
  User.findById(req.params.userId,(err,result)=>{
    res.status(200).json({message:"success",donations_received:result.donations_received});
  }).catch((err)=>{
    console.log(err);
    res.status(500).json({message:"failure",error:err});
  }) 
})
    

module.exports=router;