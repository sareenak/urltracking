import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import  jwt from "jsonwebtoken";

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
    select:false
    
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
UserSchema.pre('save',async function(){
   // console.log(this.password);
   const salt= await bcrypt.genSalt(10);
   this.password=await bcrypt.hash(this.password,salt)
})
UserSchema.methods.createJWT=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET ,{expiresIn:process.env.JWT_LIFETIME})
    //console.log(this)
}
export default mongoose.model('User',UserSchema)