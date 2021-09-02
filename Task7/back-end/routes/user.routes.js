const router = require('express').Router();
const controller = require('../app/controllers/user.controller')
const auth = require('../app/middleware/auth');
const manager = require('../app/middleware/manager');
const upload = require('../app/middleware/upload');

router.get('',(req, res)=>{
    res.send('hello from node');
})

router.post('/register', controller.addUser );
router.post('/login',controller.login );
router.post('/changeStatus/:id', auth, manager,controller.changeUserStatus );

router.post('/logout', auth, controller.logout );
router.get('/user/:id', auth, manager, controller.getUser ); 
router.patch('/update/:id', auth, manager, controller.updateUser ); 
router.delete('/delete/:id', auth, manager, controller.deleteUser );
router.get('/getAllUsers', auth, manager, controller.getAllUsers );

router.post('/upload', auth, upload.single('file'), controller.uploadImage ); 






module.exports = router;