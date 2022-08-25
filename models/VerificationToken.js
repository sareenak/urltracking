import mongoose from "mongoose";

import bcrypt from 'bcryptjs'


//setup schema
const verificationTokenSchema=new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
   },
   token:{
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
   // console.log(this.password);
   const salt= await bcrypt.genSalt(10);
   this.token=await bcrypt.hash(this.token,salt)
})

verificationTokenSchema.methods.compareToken=async function(token){
    const isMatch=await bcrypt.compare(token ,this.token)
    return isMatch
}


export default mongoose.model('VerificationToken',verificationTokenSchema)