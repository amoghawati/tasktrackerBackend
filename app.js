const express=require("express");
const cors=require("cors");
const app=express();
const PORT=5000;

const mongoose=require("mongoose");
mongoose.set("strictQuery",false);

const task=require("./Models/task");

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

const dburl="mongodb://localhost:27017/tasktracker";
mongoose.connect(dburl).then(()=>{
    console.log("connected to database");
})
app.post('/task',async(req,res)=>{
        let taskData=task.findOne({taskName:req.body.taskName})
        if(taskData.taskName){
            res.send({message:"seems like you already have an Task with this Name"})
            console.log(taskData);
        }else{
            const data=await  new task({
                taskName:req.body.taskName,
                startDate:req.body.startDate,
                endDate:req.body.endDate,
                priority:req.body.priority
            })
            try{
                await data.save()
                res.send({message:"User registered successfully"})
            }catch(err){
                res.send(err)
            }

        }
})
app.get("/task",async(req,res)=>{
    try{
        const tasks=await task.find()
        res.send(tasks)
        console.log(tasks);
    }catch(err){
        console.log(err);
    }
})
app.get("/task/:id",async(req,res)=>{
    let {id}=req.params
    try{
        const singleTask=await task.findById(id);
        res.send(singleTask);
        console.log(singleTask.id);
    }catch(err){
        res.send(err);
    }
})
app.put("/task/:id",async (req,res)=>{
    let {id}=req.params;
    // const udata= {{_id:id},$set:{
    //     taskName:req.body.taskName,
    //     startDate:req.body.startDate,
    //     endDate:req.body.endDate,
    //     priority:req.body.priority
    // }}
    // let dfind={id}
    try{
    let data=await task.findByIdAndUpdate(id,req.body)
       await console.log("Data updated successfully");
        console.log(await task.findById(id))
        await console.log(data);
        if(!data){
            res.status(404).json({message:`cannot find any task with id ${id}`})
           }
           res.status(200).json(data);
        // res.send(data)
    }catch(err){
        res.send(err);
    }
    
})
app.delete("/task/:id",async (req,res)=>{
    let {id}=req.params;
    try{
    let data=await task.findByIdAndDelete(id)
       if(!data){
        res.status(404).json({message:`cannot find any task with id ${id}`})
       }
       res.status(200).json(data);
        console.log("Data Deleted successfully");
    }catch(err){
        res.send(err);
    }
    
})
// to post task
// http://localhost:5000/task
//to get task list
// http://localhost:5000/tasks
//to access individaul task
// http://localhost:5000/tasks/:id
//to update individual task
// http://localhost:5000/update/:id
// to delete 
// http://localhost:5000/delete/:id

app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
})