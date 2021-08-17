const Task = require('../models/task.model')

const addTask = async(req,res)=>{
    const newInsert = new Task(req.body)
    try {
        await newInsert.save()
        res.status(200).send({
            apiStatus:true,
            data: newInsert,
            message: 'Task added successfully'
        })
    } catch(e) {
        res.status(500).send({
            apiStatus:false,
            data: e.message,
            message: 'Task Inserting error'
        })
    }
}

const editTask = async(req,res)=>{
    const id = req.params.id;
    const updated=req.body
    try{
        if(isValidData(updated))
         {
            const data = await Task.findByIdAndUpdate(id,updated)
            if(data)
            {
                res.status(200).send({
                    apiStatus:true,
                    data: data,
                    message: 'Task updated successfully'
                })
            }
            else{
                res.status(404).send({
                    apiStatus:false,
                    data: null,
                    message: 'Task not found'
                })
            }
         }
         else{
            res.status(500).send({
                apiStatus:false,
                data:null,
                message: 'Invalid Request'
            })
         }
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data: e.message,
            message: 'Task Editing error'
        })
    }
}

function isValidData(data){
    return  Object.keys(data).length==1 && 
            Object.keys(data)[0]==="dueDate" &&
            new Date(Object.values(data)[0]) > new Date()
}

const deleteTask = async(req,res)=>{
    const id = req.params.id;

    try{
        const data = await Task.findOneAndDelete(id)
        res.status(200).send({
            apiStatus:true,
            data,
            message: 'Task Deleted Successfully'
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data: e.message,
            message: 'Task Deleting error'
        })
    }
}

const showTask = async(req,res)=>{
    const id = req.params.id;

    try{
        const data = await Task.findById(id)
        res.status(200).send({
            apiStatus:true,
            data,
            message: 'Task loaded Successfully'
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data: e.message,
            message: 'Task Loading error'
        })
    }
}

const showAllTasks = async(req,res)=>{

    try{
        const data = await Task.find()
        res.status(200).send({
            apiStatus:true,
            data,
            message: 'Tasks loaded Successfully'
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data: e.message,
            message: 'Tasks Loading error'
        })
    }
}

module.exports = {
    addTask, editTask, deleteTask, showTask, showAllTasks
}