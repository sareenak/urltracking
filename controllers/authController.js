import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError, UnauthenticatedError} from "../errors/index.js"
import VerificationToken from "../models/VerificationToken.js"
import {generateOtp,mailTransport} from "../utils/mail.js"
import  mongoose from "mongoose"




const register =async(req,res)=>{
    const {name,email,password}=req.body

    if(!name ||  !email || !password ){
        throw new BadRequestError('Please provide all values')
    }
    const userAlreadyExist =await User.findOne({email})
    if(userAlreadyExist){
        throw new BadRequestError('Email already in use')
    }
    const OTP=generateOtp()
    
    const user=await User.create({name,email,password})
    const verificationToken=await VerificationToken.create({owner:user._id,token:OTP})
    mailTransport().sendMail({
        from:'otpverification@gmail.com',
        to:user.email,
        subject:'Verify your email account',
        html:`<h1>${OTP}</h1>`
    })
    
    
    const token=user.createJWT()
    
    res.status(StatusCodes.CREATED).json(
        {user:
        {email:user.email,
        userId:user._id,
        lastName:user.lastName,
        location:user.location,
         name:user.name},
         token})

        }
        const verifyEmail=async(req,res)=>{
            const {userId,otp}=req.body
            if(!userId || !otp.trim()){
                throw new BadRequestError('Please provide all values')
            }
            
            if(!mongoose.isValidObjectId(userId)){
                throw new UnauthenticatedError('Invalid user ')
            }
            
            const user=await User.findById(userId)
            if(!user){
                throw new UnauthenticatedError('Invalid Credentials')
            }
                

            if(user.verified){
                throw new UnauthenticatedError('User already verified')
            }
            
            const token1= await VerificationToken.findOne({owner:user._id})
            if(!token1){
                throw new UnauthenticatedError('User not found')
            }

        const isMatch=await token1.compareToken(otp)
         if(!isMatch){
            throw new UnauthenticatedError('Please provide valid token')
         }
        
          
        const verify=await VerificationToken.findByIdAndDelete(token1._id)
    
       await User.findByIdAndUpdate(user._id,{verified:true})
      
        res.json({msg:'Welcome!'})
        }
const login =async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password ){
        throw new BadRequestError('Please provide all values')
    }
    const user=await User.findOne({email}).select('+password')
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect=await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')
    }
     const token=user.createJWT
     user.password=undefined
    res.status(StatusCodes.OK).json({user,token,location:user.location})
}
const updateUser =async(req,res)=>{
    res.send('update user')
}
export  {register,login,updateUser,verifyEmail}