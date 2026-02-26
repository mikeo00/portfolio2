const express = require("express");
const multer = require("multer");
const Project = require("../models/Project.cjs");
const Buckets = require("../models/Buckets.cjs");
const requireAdmin = require("../middleware/requireAdmin.cjs");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.get('/',async(req,res)=>{
    try{
        const projects = await Project.find();
        const withUrls = projects.map(p=>({
            ...p,
            image_url:Buckets.getPublicUrl("images",p.image)
        }))
        res.status(200).json(withUrls);
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
router.get('/:id',async(req,res)=>{
    try{
        const project = await Project.findbyid(req.params.id);
        if(!project){
            return res.status(404).json({message:'project not found'});
        }else{
            const withUrl = {
                ...project,
                image_url:Buckets.getPublicUrl("images",project.image)
            }
            res.status(200).json(withUrl);
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
router.post('/',requireAdmin,upload.single("file"),async(req,res)=>{
    try{
        const {title,description,category,githublink,languages,frameworks} = req.body;
        if(!title||!description||!category||!githublink||!languages||!frameworks){
            return res.status(400).json({error:"an attribute is missing"})
        }
        if(!req.file) return res.status(400).json({error:"file is required"});
        const uploaded = await Buckets.uploadProjectImage(req.file);
        const project = await Project.create({
            title,description,image:uploaded.path,category,githublink,languages,frameworks
        })
        res.status(201).json({message:"project created successfully",project});
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
router.put('/:id',requireAdmin,async(req,res)=>{
    try{
        const project = await Project.updatebyid(req.params.id,req.body);
        if(!project){
            res.status(404).json({message:'project not found'})
        }else{
            res.status(200).json({message:'project detected'})
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
router.delete('/:id',requireAdmin,async(req,res)=>{
    try{
        const project = await Project.findbyid(req.params.id);
        const image = project.image;
        await Project.delete(req.params.id);
        if(image){
            await Buckets.remove('images',image);
        }
        res.status(200).json({message:"project deleted"})
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
module.exports = router;