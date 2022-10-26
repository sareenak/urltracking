import {UnauthenticatedError} from '../errors/index.js'
import  Jwt from 'jsonwebtoken'
const auth=async(req,res,next)=>{
    
    const authHeaders=req.headers.authorization
    
    console.log(authHeaders)
    
    if(!authHeaders || !authHeaders.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication Invalid')
    }
    const token=authHeaders.split(' ')[1]
    try {
        const payload=Jwt.verify(token,process.env.JWT_SECRET)
        //console.log(payload)
        req.user= { userId: payload.id}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
    
}
export default auth