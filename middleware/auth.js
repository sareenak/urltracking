const auth=async(req,res,next)=>{
    console.log('Authanticate User')
    next()

}
export default auth