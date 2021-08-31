const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    type:{
        type: String,
        required: true,
        trim: true,
    },
    dueDate:{
        type: Date,
        required: true,
        trim: true,
        validate(value){
            if(value < new Date()){
                    throw new Error('InValid Due Date');
            }
        }
    },
    description:{
        type: String,
        trim: true,
    },
    employeeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    managerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    statuses:[
        {
            status:{
                type: String,
                default:''
            }
        }
    ],
    notes:[
        {
            note:{
                type: String,
                default:''
            }
        }
    ]
})

const Task = mongoose.model('Task',taskSchema);
module.exports = Task;