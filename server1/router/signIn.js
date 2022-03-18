const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bycrypt=require('bcrypt');
const User=require('../models/User');

router.post('/',(req,res,next)=>{
    console.log(req.body);
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:'Auth Failed'
            })
        }else{
            if (user[0].status != "Active") {
                return res.status(401).send({
                  message: "Please Verify Your Email!",
                });
              }
            bycrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    console.log(err)
                    return res.status(401).json({
                        message:'Auth Failed'
                    });
                }
                if (result){
                    return res.status(200).json({
                        message:'Auth successfull',
                        user:user[0]
                    })
                }
                res.status(401).json({
                    message:'Auth Failed'
                })
            })
        
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});

module.exports=router;