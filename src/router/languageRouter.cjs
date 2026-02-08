const express = require('express');
const Language = require('../models/Language.cjs');
const requireAdmin = require("../middleware/requireAdmin.cjs");
const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const languages = await Language.find();
        res.status(200).json(languages);
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const language = await Language.findbyid(req.params.id);
        if(!language){
            return res.status(404).json({message:'language not found'})
        }else{
            res.status(200).json(language);
        }
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

router.post('/',requireAdmin,async(req,res)=>{
    try{
        const language = await Language.create(req.body);
        res.status(201).json({message:'language created successfully',language:language});
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
router.put('/:id',requireAdmin,async(req,res)=>{
    try{
        const id = Number(req.params.id);
        const language = await Language.findByIdUpdate(id,req.body);
        if(!language){
            return res.status(404).json({message:'language not found'})
        }else{
            res.status(200).json({message:'language updated succesfully',language:language})
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
router.delete('/:id',requireAdmin,async(req,res)=>{
    try{
        const language = await Language.delete(req.params.id);
        if(!language){
            return res.status(404).json({message:'langauge not found'})
        }else{
            res.status(200).json({message:'language deleted'})
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
module.exports=router;