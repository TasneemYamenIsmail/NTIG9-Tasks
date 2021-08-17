const express = require('express');
const taskRouter = express.Router()
const taskController = require('../src/controllers/task.controller')

taskRouter.post('/addTask', taskController.addTask)
taskRouter.patch('/editTask/:id', taskController.editTask)
taskRouter.delete('/deleteTask/:id', taskController.deleteTask)
taskRouter.get('/showTask/:id', taskController.showTask)
taskRouter.get('/showAllTasks', taskController.showAllTasks)

module.exports = taskRouter;