const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../models/User');

router.get("/:id",async(req,res)=>{
    const id=req.params.id;
    User.findById(id,function (err, result) {
        console.log(result)
        res.status(200).json({message:"success",user:result});
    }
    ).catch((err)=>{res.status(500).json(err);})
}) 



module.exports=router;