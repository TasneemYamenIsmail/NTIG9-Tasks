const User = require('../db/models/user.model');
const jwt = require('jsonwebtoken');

const employee = async function (req, res, next) {

    try{
      
        const activeUser = req.user;

        const validAction = !activeUser.type && activeUser.status;
   
        if(!validAction){
            throw new Error('Employee is not allowed to continue this action')
        }

        next();
    }
    catch(e){
        res.status(500).send({
            apistatus:false,
            data:e.message,
            message:"Employee not allowed"
        })
    }

}

module.exports = employee;
