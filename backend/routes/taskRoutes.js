const express=require('express');
const Task=require('../models/task');
const authMiddleware=require('../middlewares/authMiddleware');

const router=express.Router();
router.use(authMiddleware);

//1 create or add new task
router.post('/',async (req,res)=>{
  try{
    const {title,description,status}= req.body;

    if(!title||!description)return res.status(400).json({message:"Title and Description must be required"})
    const task=new Task({
  title,
  description,
  status,
  user:req.user.id
  })
  await task.save();
  res.status(201).json({message:"task Created Successfully",task});
  }
  catch(err){
   res.status(500).json({error:err.message});
  }
})
//2 read: get all created tasks
router.post('/',async(req,res)=>{
  try{
   const tasks=await Task.find({user:req.user.id}).sort({createdAt:-1});
   res.json(tasks)
  }
  catch(err){
   res.status(500).json({ error: err.message });
  }
})

//3 single task: given =._id
router.get('/:id',async(req,res)=>{
  try{
    const task=await Task.findOne({_id:req.params.id,user:req.user.id})
    if(!task)return res.status(404).message({message:"Task Not Found"})
    res.json(task)
    
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
})

router.put('/:id',async(req,res)=>{
  try{
    const {title,description,status}=req.body;
    const task=await Task.findOne({_id:req.params.id,user:req.user.id});

    if(!task)return res.status(404).json({message:"task not found or unauthorized"})
    if(title)task.title=title
    if(description)task.description=description
    if(status)task.status=status
    await task.save();
    res.json({message:"Task Updated Successfully",task})

  }

  catch(err){
    return res.status(500).json({error:err.message})
  }
})

router.delete('/:id',async(req,res)=>{
  try{
    const task=await Task.findOneAndDelete({_id:req.params.id,user:req.user.id});
    if(!task)return res.status(404).json({message:"task cannot found"})
      res.json({message:"Deleted Success"})
  }
  catch(err){
    return res.status(500).json({error:err.message})
  }
})

module.exports=router;