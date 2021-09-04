
const User = require('../db/models/user.model');
const responseCreator = require('../helpers/response.helper');

const addUser = async (req, res)=>{
    try{
        const user = new User(req.body);
        await user.save();
        const response = responseCreator(true, user, 'User Registerd Successfully');
        res.status(200).send(response);
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Error Registering User');
        res.status(500).send(response);
    }
}

const login = async (req,res)=>{
    try{
        const user = await User.findCredientials(req.body.userName, req.body.password);
        if(!user)
            res.status(404).send(responseCreator(false, {}, 'User Not Found'))
        const token = await user.generateToken();

        const response = responseCreator(true, {user, token}, 'User Logged In Successfully');
        res.status(200).send(response)
    }
    catch(e){
        const response = responseCreator(false, e.message, 'LogIn Error');
        res.status(500).send(response)
    }
}


const logout = async (req,res)=>{
    try{

        const user= req.user;
        if(!user)
        res.status(404).send(responseCreator(false, {}, 'User Not Found'))
        user.tokens=[]

        await user.save();
        const response = responseCreator(true, {}, 'User LoggedOut Successfully');
        res.status(200).send(response)
    }
    catch(e){
        const response = responseCreator(false, e.message, 'LogOut Error');
        res.status(500).send(response)
    }
}

const me = async (req,res)=>{
    res.status(200).send({
        apiStatus: true,
        data: req.user,
        message: "data featched"
    })        
}

const getUser = async (req,res)=>{
    
    try{
        const user = await User.findOne({_id:req.params.id});
        if(!user)
        res.status(404).send(responseCreator(false, {}, 'User Not Found'))

        const response = responseCreator(true, user, 'User loaded Successfully');
        res.status(200).send(response);
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Error Loading User');
        res.status(500).send(response)
    }
        
}

const updateUser = async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});
        if(!user)
        res.status(404).send(responseCreator(false, {}, 'User Not Found'))

        const response = responseCreator(true, user, 'User Updated Successfully');
        res.status(200).send(response);
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Error Updating User');
        res.status(500).send(response)
    }
}

const deleteUser = async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user)
        res.status(404).send(responseCreator(false, {}, 'User Not Found'))

        const response = responseCreator(true, user, 'User Deleted Successfully');
        res.status(200).send(response);
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Error Deleting User');
        res.status(500).send(response)
    }
}

const getAllUsers = async (req,res)=>{
    try{
        const users = await User.find();

        const response = responseCreator(true, users, 'Users loaded Successfully');
        res.status(200).send(response);
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Error Loading Users');
        res.status(500).send(response)
    }
}


const userTasks = async (req,res)=>{

}

const employeeTasks = async (req,res)=>{
    try{
        const user = req.user
        await user.populate({path:"employeeTasks"})
        const response = responseCreator(true, user.employeeTasks, 'Employee Tasks Loaded Successfully');
        res.status(200).send(response)
    }
    catch(e) {
        const response = responseCreator(false, e.message, 'Employee Tasks Loading Error');
        res.status(500).send(response)
    }
}

const changeUserStatus = async (req,res)=>{

    try{

        const user = await  User.findOne({_id:req.params.id});
        user.status = req.body.status;
        await user.save();
        const response = responseCreator(true, user, 'Employee Decativated Successfully');
        res.status(200).send(response)
    }
    catch(e) {
        const response = responseCreator(false, e.message, 'Employee Deactivation Error');
        res.status(500).send(response)
    }
}

const uploadImage = async (req,res)=>{
    try{
        req.user.profileImg = req.file.filename
        await req.user.save();

        const response = responseCreator(true, req.user.profileImg, 'Profile Image uploaedd Successfully');
        res.status(200).send(response)
    }
    catch(e) {
        const response = responseCreator(false, e.message, 'Profile Img upload Error');
        res.status(500).send(response)
    }
}

module.exports = {
    addUser,
    login,
    logout,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
    userTasks,
    employeeTasks,
    changeUserStatus,
    uploadImage,
    me
}