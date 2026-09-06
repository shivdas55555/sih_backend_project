const mongoose= require('mongoose');

const taskSchema= new mongoose.Schema({
  title: {
      type: String,
      required: [true, 'Problem title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Healthcare',
        'Education',
        'Environment',
        'Smart City',
        'Agriculture',
        'Governance',
        'Other'
      ],
      default: 'Other',
    },
    description: {
      type: String,
      required: [true, 'Problem description is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
  status:{
    type:String,
    enum:['in-progress','pending','completed'],
    default:'pending'
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
},{timestamps:true})

module.exports =mongoose.model("Task",taskSchema)