const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../models/User');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("624398540702-hft2l1uf6p82b8u4ui0soag8l7e9mdrq.apps.googleusercontent.com")

router.post("/", async (req, res) => {
    console.log(req.body)
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { name, email, picture } = ticket.getPayload();
    User.find({email:email})
    .exec()
    .then(user=>{
        if(user.length<1){
            const user=new User({
                _id:new mongoose.Types.ObjectId,
                name:name,
                role:"donor",
                email:email,
                password:"none",
                status:"Active",
                confirmationCode:""
            });
            user
            .save()
            .then(result=>{
                res.status(200).json({
                    message :"success",
                    user:user
                })
            })
        }else{
            
            return res.status(200).json({
                message:'success',
                user:user[0]    
            })
        
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })

})

module.exports=router;