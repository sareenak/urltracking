import cors from 'cors'
import express from 'express'
const app=express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'

//db 
import connectDB from './db/connect.js'
//Authenticate User
import authRouter from './routes/authRoutes.js'
import urlRouter from './routes/urlRoutes.js'
//middleware
import notFoundMiddleWare from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    //throw new Error('error')
    res.json({msg:'Welcome!'})
})
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/url',urlRouter)

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