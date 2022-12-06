import Url from "../models/Url.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError,NotFoundError} from '../errors/index.js'
import { urlencoded } from "express"

const createUrl=async(req,res)=>{
   
    const {websiteUrl,campaignSource,campaignMedium,campaignName}=req.body
   
   if(!websiteUrl || !campaignSource || !campaignMedium || !campaignName){
   
    throw new BadRequestError('Please provide all values')

}
//generate url_uid

const generateUid=async()=>{
 let uid=Math.random().toString(36).slice(-6)
 req.body.url_uid=uid
 let uidExist= await Url.exists({url_uid:uid})
 if(uidExist ){
    return generateUid()
 }

 return uid
}
generateUid()

req.body.createdBy=req.user.userId

const url =await Url.create(req.body)
// Url.updateMany({}, {
//     $inc: { visitersCount: 1 }
//   }).exec()
await Url.findByIdAndUpdate(url._id,{$inc:{visitersCount:1}}).exec()
res.status(StatusCodes.CREATED).json({url})



}
const deleteUrl=async(req,res)=>{
    res.send('deleteUrl')
}
const getAllUrls=async(req,res)=>{
    const urls=await Url.find({createdBy:req.user.userId})

    res.status(StatusCodes.OK).json({urls,totalUrls: urls.length ,numberOfPages:1})
}
const updateUrl=async(req,res)=>{
    res.send('updateUrl')
}


const showStats=async(req,res)=>{
    res.send('showStats')
}
export {createUrl,deleteUrl,getAllUrls,updateUrl,showStats}