const express = require("express");
const multer = require("multer");
const Language = require("../models/Language.cjs");
const Buckets = require("../models/Buckets.cjs");
const requireAdmin = require("../middleware/requireAdmin.cjs");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.get("/", async (req, res) => {
  try {
    const languages = await Language.find();

    const withUrls = languages.map(l => ({
      ...l,
      logo_url: Buckets.getPublicUrl("language_logos", l.logo)
    }));

    res.status(200).json(withUrls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:id',async(req,res)=>{
    try{
        const language = await Language.findbyid(req.params.id);
        if(!language){
            return res.status(404).json({message:'language not found'})
        }else{ 
            const withUrl = {
                ...language,
                logo_url: Buckets.getPublicUrl("language_logos", language.logo)
            };
            res.status(200).json(withUrl);
        }
       
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

router.post("/",requireAdmin,upload.single("file"), async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "title is required" });
    if (!req.file) return res.status(400).json({ error: "file is required (field name: file)" });
    const uploaded = await Buckets.uploadLogoLang(req.file);
    const language = await Language.create({
      title,
      logo: uploaded.path
    });

    return res.status(201).json({ message: "language created successfully", language });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
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
        const sellanguage = await Language.findbyid(req.params.id);
       const logoPath = sellanguage.logo;
    await Language.delete(req.params.id);
    if (logoPath) {
      await Buckets.remove('language_logos', [logoPath]);
    }
        res.status(200).json({message:'language deleted'}) 
    }catch(error){
        res.status(500).json({error:error.message});
    }
});
module.exports=router;