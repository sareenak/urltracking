
import express from 'express'
const app=express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'

//db 
import connectDB from './db/connect.js'
//Authenticate User
import authRouter from './routes/authRoutes.js'
import urlRouter from './routes/urlRoutes.js'
//middleware
import notFoundMiddleWare from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'
import url from './middleware/url.js'
import Url from './models/Url.js'
if(process.env.NOD_ENV !=='production'){
    app.use(morgan('dev'))
}
app.use(express.json())
app.get('/',(req,res)=>{
    //throw new Error('error')
    res.json({msg:'Welcome!'})
})
app.get('/:id',async(req,res)=>{
    const {id}=req.params
    const url=await Url.findOne({url_uid:id})

    if(!url){
        throw new NotFoundError(`No url with id${id}`)
    }  
    await Url.findByIdAndUpdate({_id:url._id},{$inc:{visitersCount:1}},
        {new:true,runValidators:true,})
    res.redirect(url.websiteUrl)
    //res.json({msg:'API'})
})


app.get('/api/v1',(req,res)=>{
    
    res.json({msg:'API'})
})

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/url',authenticateUser,urlRouter)

app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleware)


const port=process.env.PORT || 5000


const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}...`)
            //console.log('hii')
        })

    } catch (error) {
        console.log(error)
    }
}
start()