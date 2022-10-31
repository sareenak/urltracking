import Url from "../models/Url.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError,NotFoundError} from '../errors/index.js'

const createUrl=async(req,res)=>{
   
    const {website_url,campaign_source,campaign_medium,campaign_name}=req.body
   
   if(!website_url || !campaign_source || !campaign_medium || !campaign_name){
   
    throw new BadRequestError('Please provide all values')

}

req.body.createdBy=req.user.userId

const url =await Url.create(req.body)
res.status(StatusCodes.CREATED).json({url})


}
const deleteUrl=async(req,res)=>{
    res.send('deleteUrl')
}
const getAllUrls=async(req,res)=>{
    res.send('getAllUrls')
}
const updateUrl=async(req,res)=>{
    res.send('updateUrl')
}


const showStats=async(req,res)=>{
    res.send('showStats')
}
export {createUrl,deleteUrl,getAllUrls,updateUrl,showStats}