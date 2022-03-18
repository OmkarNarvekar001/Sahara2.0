const mongoose=require('mongoose');

const PostSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      img: {
        type: String
      },
      caption:{
        type:String
      },
      likes: {
        type: Array,
        default: [],
      },
      post_type:{
        type:String,//request, general
        required:true
      },
      donations:{
          type:Array,
          default: [],
      },
      ngoId:{
        type:String,
        default: "",
      },
      ml_likes:{
        type:Number,
        default:0,
      },
      ml_followers:{
        type:Number,
        default:0,
      },
      ml_followings:{
        type:Number,
        default:0,
      },
      ml_donations:{
        type:Number,
        default:0,
      },
      ml_posts:{
        type:Number,
        default:0,
      },
      results:{
        type:Array,
        default:[],
      },
    },
    { timestamps: true }
  );


module.exports=mongoose.model('Post',PostSchema);