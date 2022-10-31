import mongoose from "mongoose";
//setup schema
const UrlSchema=new mongoose.Schema({
    url:{
        type:String,
        required:[true,'Please provide valid url'],
        maxlength:100,
        
},
campaign_source:{
    type:String,
    required:[true,'Please provide valid Campaign Source'],
    maxlength:50
},
campaign_medium:{
    type:String,
    required:[true,'Please Provide Campaign Medium ']
    
},
campaign_term:{
    type:String
    
},
campaign_content:{
    type:String
},
campaign_name:{
    type:String,
    required:[true,'Please Provide Campaign Name']
},
createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:[true,'Please provide User']
},
},{timestamps:true})
export default mongoose.model('Url',UrlSchema)