import mongoose from "mongoose";

import bcrypt from 'bcryptjs'


//setup schema
const verificationTokenSchema=new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
   },
   otp:{
    type:String,
    required:true
   },
   createdAt:{
    type:Date,
    expires:600,
    default:Date.now()
   },


})
//create the User collection with export
verificationTokenSchema.pre('save',async function(){
   
 const salt= await bcrypt.genSalt(10);
  this.otp=await bcrypt.hash(this.otp,salt)
})

verificationTokenSchema.methods.compareToken=async function(otp){
    const isMatch=await bcrypt.compare(otp ,this.otp)
    return isMatch
}


export default mongoose.model('VerificationToken',verificationTokenSchema)