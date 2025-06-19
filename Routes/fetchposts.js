import express from 'express';
import Post from "../models/UserpostsModel.js"

const router=express.Router()
router.get('/api/posts',async (req,res)=>{
   try{
    const response=await Post.find({}).sort({createdAt:-1});
    res.json(response)
    console.log(response)
   }
    catch(error){
        res.status(500).json({error})
    }
});
export default router;