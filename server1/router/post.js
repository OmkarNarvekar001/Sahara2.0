const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Post=require('../models/Post');
const multer = require('multer');
const axios=require('axios');

var date

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

router.post("/add",upload.single("postImage"), async (req, res) => {
  
  console.log(req.file.path)
    const newPost = new Post({
      userId:req.body.userId,
      img:date+"_"+req.body.img,
      caption:req.body.caption,
      post_type:req.body.post_type,
      ml_likes:Math.floor(Math.random() * (3000 - 1) + 1),
      ml_followers:Math.floor(Math.random() * (500 - 1) + 1),
      ml_followings:Math.floor(Math.random() * (100 - 1) + 1),
      ml_donations:Math.floor(Math.random() * (20 - 1) + 1),
      ml_posts:Math.floor(Math.random() * (30 - 1) + 1)
    });
    console.log(newPost)
    try {
      const savedPost = await newPost.save();
      res.status(200).json({message:"success",post:savedPost});
    } catch (err) {
      console.log(err,"$$$$$$$$")
      res.status(500).json(err);
    }
  });

router.get("/read",async (req, res) => {
  Post.find({},(err,result)=>{
    if(err){
      res.status(500).json(err);
    }
    res.status(200).json({message:"success",post:result});
})
})

router.put("/like", async (req, res) => {
  const userId=req.body.userId;
  const postId=req.body.postId;
  console.log(userId,postId)
  try{
    Post.findById(postId,function (err, result) {
    result.likes.push(userId)
    result.markModified('likes');
    result.save();
    res.status(200).json({
      message:"success",
      post:result
    })
  }
  ).catch((err)=>{res.status(500).json(err);})
  }catch(err){
    res.status(500).json(err)
  }
});

router.put("/dislike", async (req, res) => {
  const userId=req.body.userId;
  const postId=req.body.postId;
  try{
    Post.findById(postId,function (err, result) {
    if(result.likes.includes(userId)){
      const index = result.likes.indexOf(userId);
      if (index > -1) {
        result.likes.splice(index, 1);
      }
      result.markModified('likes');
      result.save();
      res.status(200).json({
        message:"success",
        post:result
      })
    }
    else{
      res.status(200).json({
        message:"not liked"
      })
    }
    
  }
  ).catch((err)=>{res.status(500).json(err);})
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/sharesuccess',async(req,res,next)=>{
  try{
  const newPost = new Post({
    userId:req.body.userId,
    ngoId:req.body.ngoId,
    caption:req.body.caption,
    post_type:"general",
    img:`${Date.now()}_none`,
    ml_likes:Math.floor(Math.random() * (3000 - 1) + 1),
    ml_followers:Math.floor(Math.random() * (500 - 1) + 1),
    ml_followings:Math.floor(Math.random() * (100 - 1) + 1),
    ml_donations:Math.floor(Math.random() * (20 - 1) + 1),
    ml_posts:Math.floor(Math.random() * (30 - 1) + 1)
  });
  const savedPost = await newPost.save();
  res.status(200).json({message:"success",post:savedPost});
  
  }catch(error){
    console.log(error,"$$$$$$$$")
    res.status(500).json(error)
  } 
})

router.get("/getranked",async (req, res) => {
  var posts=[];
  var predictions
  var send=[]
  Post.find({},(err,post)=>{
    if(err){
      res.status(500).json(err);
    }
    for (let i=0;i<post.length;i++){
        var ml_likes=post[i].ml_likes;
        var ml_followers=post[i].ml_followers;
        var ml_followings=post[i].ml_followings;
        var ml_donations=post[i].ml_donations;
        var ml_posts=post[i].ml_posts;

        
        send.push([ml_likes,ml_followers,ml_followings,ml_donations,ml_posts])
        posts.push(post[i])
    }
    axios({
      url: `http://localhost:8008/${JSON.stringify({send}["send"])}`,
      method: "get",
    })
      .then(response => {
        var predictions=response.data.data;
        console.log(predictions)
        for(let i=0;i<predictions.length;i++){
          posts[i].results.push(predictions[i])
        }
        courses.sort((a,b) => {
          if(a.results[0] > b.results[0]) return -1;
          if(a.results[0] < b.results[0]) return 1;
          return 0;
      });
      console.log(posts)
        res.status(200).json({message:"success",posts:posts});
      })
    
})
})










router.get("/:id",async (req, res) => {
  Post.find({userId:req.params.id},(err,result)=>{
    if(err){
      
      res.status(500).json(err);
    }
    res.status(200).json({message:"success",posts:result});
})
})

    

module.exports=router;