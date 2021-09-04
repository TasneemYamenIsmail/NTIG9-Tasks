BackEnd Port  http://localhost:4000/

Apis:
```
    router.post('/register', controller.addUser );
    router.post('/login',controller.login );
    router.post('/changeStatus/:id', auth, manager,controller.changeUserStatus );
    router.post('/logout', auth, controller.logout );
    router.get('/me', auth, controller.me );
    router.get('/user/:id', auth, manager, controller.getUser ); 
    router.patch('/update/:id', auth, manager, controller.updateUser ); 
    router.delete('/delete/:id', auth, manager, controller.deleteUser );
    router.get('/getAllUsers', auth, manager, controller.getAllUsers );
    router.post('/upload', auth, upload.single('file'), controller.uploadImage ); 

    router.post('/addTask', auth, manager,  taskController.addTask ); //
    router.get('/getTask/:id', auth, taskController.getTask );//
    router.patch('/updateTask/:id', auth, taskController.updateTask );//
    router.delete('/deleteTask/:id', auth, manager, taskController.deleteTask );//
    router.get('/allTasks', auth, manager,taskController.getAllTasks ) //
    router.post('/assignTask/:id', auth, manager, taskController.assignTask );
    router.get('/employeeTasks', auth, employee, userController.employeeTasks );
    router.post('/task/addNote/:id', auth, employee, taskController.addNote );
    router.post('/task/addStatus/:id', auth, employee, taskController.addStatus );
```

FrontEnd Port  http://localhost:4200/

functionalities:
================

**register**
**login**
**/main/users-list** => for manager only
- view all users
- add new user
- view one user
- edit user
- delete user
- change user status

**/main/tasks-list** => for employee gets only his tasks, for manager gets all tasks
- view all tasks
- add new task
- view one task
- edit task
- delete task
- assign employee to task
- add note to task, ==> employee only
- add status to task ==> employee only

**logout**
