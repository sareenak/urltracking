import {UnauthenticatedError} from '../errors/index.js'
import  Jwt from 'jsonwebtoken'
const url=async(req,res,next)=>{
    
    const urlHeaders=req.headers.authorization
    
    console.log(urlHeaders)
    
    if(!urlHeaders || !urlHeaders.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication Invalid')
    }
    const token=urlHeaders.split(' ')[1]
    try {
        const payload=Jwt.verify(token,process.env.JWT_SECRET)
        //console.log(payload)
        req.url = { url_uid: payload.id}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
    
}
export default url