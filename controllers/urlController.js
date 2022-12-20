import Url from "../models/Url.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError,NotFoundError} from '../errors/index.js'
import { urlencoded } from "express"
import async from "hbs/lib/async.js"

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
//await Url.findByIdAndUpdate(url._id,{$inc:{visitersCount:1}}).exec()
res.status(StatusCodes.CREATED).json({url})



}
const deleteUrl=async(req,res)=>{
    const{id}=req.params
    await Url.findByIdAndDelete({_id:id})
    res.send('deleteUrl')
}
//user
const getAllUrls=async(req,res)=>{
    const urls=await Url.find({createdBy:req.user.userId})

    res.status(StatusCodes.OK).json({urls,totalUrls: urls.length ,numberOfPages:1})
}
//admin
const getAllUrl=async(req,res)=>{
    const urls=await Url.find()
    
    res.status(StatusCodes.OK).json({urls,totalUrls: urls.length ,numberOfPages:1})
}
// const visiterCount=async(req,res)=>{
    
// }
 const updateUrl=async(req,res)=>{

    const {id:urlId}=req.params
    //const {websiteUrl,campaignName}=req.body
    // if(!websiteUrl || !campaignName){
    //     throw new BadRequestError('please provide all values')
    // }
    // const url=await Url.find()
    // if(url._id===urlId){
    //     throw new NotFoundError(`No url with id${urlId}`)
    // }
    const count=await Url.findByIdAndUpdate({_id:urlId},{$inc:{visitersCount:1}},
        {new:true,runValidators:true,})
    if(!count){
        throw new NotFoundError(`No url with id${urlId}`)
    }

    //update permission
    // const updateUrl=await Url.findByIdAndUpdate({_id:urlId},req.body,{
    //     new:true,
    //     runValidators:true,
    // })

   
     res.status(StatusCodes.OK).json({count})
 }
 const handleRedirect=async(req,res)=>{
    const {id:urlId}=req.params
    const url=await Url.findOne({url_uid:urlId})
    if(!url){
        throw new NotFoundError(`No url with id${urlId}`)
    }  
    const websiteUrl=url.websiteUrl
    res.status(StatusCodes.OK).json({websiteUrl})

 }


const showStats=async(req,res)=>{
    res.send('showStats')
}
export {createUrl,deleteUrl,getAllUrls,updateUrl,showStats,getAllUrl,handleRedirect}