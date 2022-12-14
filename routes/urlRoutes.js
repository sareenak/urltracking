import express from 'express'
import authenticateUser from '../middleware/auth.js'
const router = express.Router() 
import  {createUrl,deleteUrl,
    getAllUrls,updateUrl,
    showStats,getAllUrl} 
    
    from '../controllers/urlController.js'
    router.route('/').post(createUrl).get(getAllUrls)
    router.route('/stats').get(authenticateUser,showStats)
    router.route('/:id').delete(deleteUrl).patch(updateUrl)
    router.route('/all-url').get(getAllUrl)
export default router

