import { StatusCodes } from "http-status-codes"
const errorHandlerMiddleware = (err,req,res,next) =>{
    console.log(err.message)
    const defaultError={
        statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message ||'Something went wrong,try again later'
    }
    if(err.name==='ValidationError'){   //err.name and err.message are the error object .
        defaultError.statusCode=StatusCodes.BAD_REQUEST  
        //defaultError.msg=err.message
        defaultError.msg=Object.values(err.errors).map((item)=>item.message).join(',')
    }
     if(err.code&&err.code===11000){
        defaultError.msg=`${Object.keys(err.keyValue)} has to be unique`
     }
    res.status(defaultError.statusCode).json({msg:defaultError.msg})
    //res.status(defaultError.statusCode).json({msg:err})
}
export default errorHandlerMiddleware