const router = require('express').Router();
const taskController = require('../app/controllers/task.controller')
const userController = require('../app/controllers/user.controller')
const auth = require('../app/middleware/auth');
const manager = require('../app/middleware/manager');
const employee = require('../app/middleware/employee');

router.get('',(req, res)=>{
    res.send('hello from node');
})

router.post('/addTask', auth, manager,  taskController.addTask ); //
router.get('/getTask/:id', auth, taskController.getTask );//
router.patch('/updateTask/:id', auth, taskController.updateTask );//
router.delete('/deleteTask/:id', auth, manager, taskController.deleteTask );//
router.get('/allTasks', auth, manager,taskController.getAllTasks ) //
router.post('/assignTask/:id', auth, manager, taskController.assignTask );

router.get('/employeeTasks', auth, employee, userController.employeeTasks );

router.post('/task/addNote/:id', auth, employee, taskController.addNote );
router.post('/task/addStatus/:id', auth, employee, taskController.addStatus );

module.exports = router