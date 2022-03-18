const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    role:{type:String,required:true},
    phone:{
        type:String,
        default: "",
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    password:{
        type:String,
        required:true
    },
    loc: {
        type: { type: String},
        coordinates: [],
    },
    followers: {
        type: Array,
        default: [],
      },
    followings: {
        type: Array,
        default: [],
    },
    profilePicture: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    donations_made:{
        type:Array,
        default: [],
    },
    donations_received:{
        type:Array,
        default: [],
    },
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
      },
    confirmationCode: { 
        type: String,
        default:""
    },
    hd:{
        type:Boolean,
        default:false
    },
    hl:{
        type:Boolean,
        default:false
    },
},
{ timestamps: true }
);

module.exports=mongoose.model('User',userSchema);
