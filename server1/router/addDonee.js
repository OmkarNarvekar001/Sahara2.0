const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Donee=require('../models/Donee');

router.post('/',(req,res,next)=>{
    console.log(req.body);
    Donee.find({aadhar:req.body.aadhar})
    .exec()
    .then(donee=>{
        if(donee.length>=1){
            return res.status(409).json({
                message:'Donee already exists'
            });
        }else{
            
                const donee=new Donee({
                    _id:new mongoose.Types.ObjectId,
                    name:req.body.name,
                    aadhar:req.body.aadhar,
                    donee_type:req.body.donee_type,
                    help_type:req.body.help_type,
                    donations:req.body.donations,
                    loc:req.body.loc
                    });
                    donee
                    .save()
                    .then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message :"Donee added successfully"
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
    .catch(err=>{
        console.log(err);
        res.status(422).json({
            error:err
        });
    });

});

module.exports=router;