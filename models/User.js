import mongoose from "mongoose";
import validator from "validator";

//setup schema
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide valid name'],
        minlength:3,
        maxlength:20,
        trim:true
},
email:{
    type:String,
    required:[true,'Please provide valid email'],
    validate:{validator: validator.isEmail ,
    message:'Please provide valid email'},
    unique:true,
},
password:{
    type:String,
    required:[true,'Please provide valid password'],
    minlength:6,
    
},
lastName:{
    type:String,
    maxlength:20,
    trim:true,
    default:'lastName',
},
location:{
    type:String,
    maxlength:20,
    trim:true,
    default:'My city'
},

})
//create the User collection with export
export default mongoose.model('User',UserSchema)