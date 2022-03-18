const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../models/User');

router.get('/:confirmationCode/',(req,res,next)=>{
    User.findOne({
        confirmationCode: req.params.confirmationCode,
      })
        .then((user) => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
    
          user.status = "Active";
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            else{
              res.status(200).send("<style>button:hover{cursor:pointer;}</style><div style='height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center'><h1 style='font-family: Calibri;'>Account activated successfully!!</h1><br><br><button  style='box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px; border:0px;border-radius:3px; width:100px;padding:10px; font-size:15px;background-color:#4267B2; color:white;' onclick='location.href=`http://localhost:3000/signIn`'>Login</button></div>")
            }
          });
        })
        .catch((e) => console.log("error", e));
}) 

module.exports=router;