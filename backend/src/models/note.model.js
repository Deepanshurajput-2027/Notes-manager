const mongoose=require("mongoose")

//schema of data
const noteSchema=new mongoose.Schema({
    title:String,
    description:String
})

//model creation
const noteModel=mongoose.model("notes",noteSchema)

module.exports=noteModel