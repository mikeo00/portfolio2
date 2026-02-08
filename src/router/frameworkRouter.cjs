const Framework = require("../models/Framework.cjs");
const express = require("express");
const requireAdmin = require("../middleware/requireAdmin.cjs");
const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const frameworks = await Framework.find();
        res.status(200).json(frameworks);
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
            res.status(200).json(framework);
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
router.post('/',requireAdmin,async(req,res)=>{
    try{
        const framework = await Framework.create(req.body);
        res.status(201).json(framework);
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
        const framework = await Framework.delete(req.params.id);
        if(!framework){
            res.status(404).json({message:'framework not found'});
        }else{
            res.status(200).json({message:'framework detected'});
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
module.exports = router;