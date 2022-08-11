import express from 'express'
const router = express.Router() 
import  {createUrl,deleteUrl,
    getAllUrls,updateUrl,
    showStats} 
    from '../controllers/urlController.js'
    router.route('/').post(createUrl).get(getAllUrls)
    router.route('/stats').get(showStats)
    router.route('/:id').delete(deleteUrl).patch(updateUrl)
export default router

