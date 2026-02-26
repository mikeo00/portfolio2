const express = require("express");
const multer = require("multer");
const Framework = require("../models/Framework.cjs");
const Buckets = require("../models/Buckets.cjs");
const requireAdmin = require("../middleware/requireAdmin.cjs");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.get('/',async(req,res)=>{
    try{
        const frameworks = await Framework.find();
        const withUrls = frameworks.map(f=>({
            ...f,
            logo_url: Buckets.getPublicUrl("framework_logos",f.logo)
        }))
        res.status(200).json(withUrls)
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
router.get('/:id',async(req,res)=>{
    try{
        const framework = await Framework.findbyid(req.params.id);
        if(!framework){
            return res.status(404).json({message:'framework not found'});
        }else{
            const withUrl = {
                ...framework,
                logo_url: Buckets.getPublicUrl("framework_logos",framework.logo)
            }
            res.status(200).json(withUrl);
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
router.post('/',requireAdmin,upload.single("file"),async(req,res)=>{
    try{
        const {title} = req.body;
        if(!title) return res.status(400).json({error:"title is required"});
        if(!req.file) return res.status(400).json({error:"file is required"});
        const uploaded = await Buckets.uploadFrameworkLogo(req.file);
        const framework = await Framework.create({
            title,
            logo:uploaded.path
        });
        return res.status(201).json({message:"framework created successfully",framework})
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
router.put('/:id',requireAdmin,async(req,res)=>{
    try{
        const framework = await Framework.updatebyid(req.params.id,req.body);
        if(!framework){
            res.status(404).json({message:'framework not found'})
        }else{
            res.status(200).json({message:'framework detected'})
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
router.delete('/:id',requireAdmin,async(req,res)=>{
    try{
        const selectedframework = await Framework.findbyid(req.params.id);
        const logo = selectedframework.logo;
        await Framework.delete(req.params.id);
        if(logo){
            await Buckets.remove('framework_logos',[logo])
        }
        res.status(200).json({message:"framework deleted"});
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
module.exports = router;