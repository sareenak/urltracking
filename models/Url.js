import mongoose from "mongoose";
import validator from "validator";
//setup schema
const UrlSchema=new mongoose.Schema({
    websiteUrl:{
        type:String,
        required:[true,'Please provide valid URL'],
        validate:{validator: value=>validator.isURL(value,{protocols:['http','https','ftp'],require_tld:true,require_protocol:true}),
        message:'Please provide valid URL'},
        
        
        
},
campaignSource:{
    type:String,
    required:[true,'Please provide valid Campaign Source'],
    maxlength:50
},
campaignMedium:{
    type:String,
    required:[true,'Please Provide Campaign Medium ']
    
},
campaignTerm:{
    type:String,
    default:""
    
},
campaignContent:{
    type:String,
    default:''
},
campaignName:{
    type:String,
    required:[true,'Please Provide Campaign Name']
},
url_uid:{
      type:String,
      unique:true,
      
},
visitersCount:{
    type:Number,
    default:0,
},


createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:[true,'Please provide User']
},

},{timestamps:true})
export default mongoose.model('Url',UrlSchema)