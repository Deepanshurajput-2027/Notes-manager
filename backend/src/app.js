//server create krna
//server config krna

const express=require("express")
const app=express()
const cors=require("cors")
const noteModel = require("./models/note.model")
const path =require("path")
app.use(express.json())
app.use(cors())
app.use(express.static("/public"))

app.post("/api/notes",async (req,res)=>{
    const {title,description}=req.body
    const note=await noteModel.create({title,description})
    res.status(201).json({
        message:"Note created successfully",
        note
    })
})

app.get("/api/notes",async (req,res)=>{
    const notes=await noteModel.find()
    res.status(200).json({
        message:"All notes fetched",
        notes:notes
    })
})

app.delete("/api/notes/:id",async (req,res)=>{

    await noteModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        message:"Note deleted successfully",
    })
})

app.patch("/api/notes/:id",async (req,res)=>{
    const {description}=req.body
    await noteModel.findByIdAndUpdate({_id:req.params.id},{description})
    res.status(200).json({
        message:"Note updated successfully",
    })
})

app.put("/api/notes/:id",async (req,res)=>{
    const {title,description}=req.body
    await noteModel.findOneAndReplace({_id:req.params.id},{title,description})
    res.status(200).json({
        message:"note replaced successfully",
    })
})

app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public/index.html'))
})

module.exports=app