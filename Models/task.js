const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    taskName:{
        type:String,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true
    },
})
module.exports=mongoose.model("task",taskSchema)