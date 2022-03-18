const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Donee=require('../models/Donee');

router.get('/',(req,res,next)=>{
    Donee.find({},function (err, result) 
    {res.json(result);}
    ); 
}) 

module.exports=router;