const createUrl=async(req,res)=>{
    res.send('createUrl')
}
const deleteUrl=async(req,res)=>{
    res.send('deleteUrl')
}
const getAllUrls=async(req,res)=>{
    res.send('getAllUrls')
}
const updateUrl=async(req,res)=>{
    res.send('updateUrl')
}


const showStats=async(req,res)=>{
    res.send('showStats')
}
export {createUrl,deleteUrl,getAllUrls,updateUrl,showStats}