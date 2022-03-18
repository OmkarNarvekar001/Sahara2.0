const mongoose=require('mongoose');

const doneeSchema=mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    aadhar:{type:String,required:true,unique:true},
    donee_type:{type:String,required:true},
    help_type:{type:String,required:true},
    donations:{type:Number,required:true},
    loc: {
        type: { type: String,required:true },
        coordinates: [],
    },
},
{ timestamps: true }
);

module.exports=mongoose.model('Donee',doneeSchema);
