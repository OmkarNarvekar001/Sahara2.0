const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const User=require('../models/User');
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

router.post('/',(req,res,next)=>{
    
    // const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // let token = '';
    // for (let i = 0; i < 25; i++) {
    //     token += characters[Math.floor(Math.random() * characters.length )];
    // }
    const token = jwt.sign({email: req.body.email},"activatethetokenplease")
    console.log(req.body);
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message:'User already exists'
            });
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        error:err
                    })
                }else{
                    const user=new User({
                        _id:new mongoose.Types.ObjectId,
                        name:req.body.name,
                        role:req.body.role,
                        email:req.body.email,
                        password:hash,
                        confirmationCode: token
                    });
                    user
                    .save()
                    .then(result=>{
                        console.log(result);
                        console.log("Check");

                        const user = "testmail8108@gmail.com";
                        const pass = "thunDer@1234";
                        const transport = nodemailer.createTransport({
                            service: "Gmail",
                            auth: {
                              user: user,
                              pass: pass,
                            },
                          });

                        transport.sendMail({
                          from: user,
                          to: req.body.email,
                          subject: "Please confirm your account",
                          html: `<h1>Email Confirmation</h1>
                              <h2>Hello ${req.body.name}</h2>
                              <p>Thank you for Registering. Please confirm your email by clicking on the following link</p>
                              <a href=http://localhost:3001/api/auth/confirm/${token}> Click here</a>
                              </div>`,
                        }).catch(err => console.log(err));

                        res.status(201).json({
                            message :"User created successfully",
                            user:user
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        })
                    })
                }
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(422).json({
            error:err
        });
    });

});

module.exports=router;