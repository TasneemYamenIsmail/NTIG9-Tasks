
const Task = require('../db/models/task.model');
const responseCreator = require('../helpers/response.helper');


const addTask = async (req,res)=>{
    try{
        const task = new Task(req.body);
        await task.save();
        const response = responseCreator(true, task, 'Task Created Successfully');
        res.status(200).send(response);
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Error Creating Task');
        res.status(500).send(response);
    }
}

const getTask = async (req,res)=>{
    try{
        const task = await Task.findOne({_id:req.params.id});
        if(!task)
        res.status(404).send(responseCreator(false, {}, 'Task Not Found'))

        const response = responseCreator(true, task, 'Task loaded Successfully');
        res.status(200).send(response);
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Error Loading Task');
        res.status(500).send(response)
    }
}

const updateTask = async (req,res)=>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});
        if(!task)
        res.status(404).send(responseCreator(false, {}, 'Task Not Found'))

        const response = responseCreator(true, task, 'Task Updated Successfully');
        res.status(200).send(response);
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Error Updting Task');
        res.status(500).send(response)
    }
}

const deleteTask = async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task)/* */
        res.status(404).send(responseCreator(false, {}, 'Task Not Found'))

        const response = responseCreator(true, task, 'Task Deleted Successfully');
        res.status(200).send(response);
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Error Deleting Task');
        res.status(500).send(response)
    }
}

const getAllTasks = async (req,res)=>{
    try{
        const tasks = await Task.find();

        const response = responseCreator(true, tasks, 'Tasks loaded Successfully');
        res.status(200).send(response);
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Error Loading Tasks');
        res.status(500).send(response)
    }
}

const assignTask = async (req,res)=>{
    try{
        const task = await Task.findOne({_id:req.params.id});

        const employeeId= req.body.id;
        task.employeeId = employeeId;
        console.log('employeeId',employeeId);
        await task.save();
        const response = responseCreator(true, task, 'Employee assigned to task Successfully');
        res.status(200).send(response);
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Error Loading Tasks');
        res.status(500).send(response)
    }
}

const addNote = async (req,res)=>{
    try{
        const task = await Task.findOne({_id:req.params.id});

        const note= req.body.note;
        task.notes = task.statuses.concat({note});;
        await task.save();
        const response = responseCreator(true, task, 'Note added to task Successfully');
        res.status(200).send(response);
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Error Adding Note to Task');
        res.status(500).send(response)
    }
}

const addStatus = async (req,res)=>{
    try{
        const task = await Task.findOne({_id:req.params.id});

        const status= req.body.status;
        task.statuses = task.statuses.concat({status});;
        await task.save();

        const response = responseCreator(true, task, 'Status added to task Successfully');
        res.status(200).send(response);
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Error Adding Status to Task');
        res.status(500).send(response)
    }
}


module.exports = {
    addTask,
    getTask,
    updateTask,
    deleteTask,
    getAllTasks,
    assignTask,
    addNote,
    addStatus
}