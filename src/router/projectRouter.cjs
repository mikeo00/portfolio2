const Project = require("../models/Project.cjs");
const express = require("express");
const requireAdmin = require("../middleware/requireAdmin.cjs");
const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const projects = await Project.find();
        res.status(200).json(projects);
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
            res.status(200).json(project);
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
router.post('/',requireAdmin,async(req,res)=>{
    try{
        const project = await Project.create(req.body);
        res.status(201).json(project);
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
        const project = await Project.delete(req.params.id);
        if(!project){
            res.status(404).json({message:'project not found'});
        }else{
            res.status(200).json({message:'project detected'});
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
module.exports = router;