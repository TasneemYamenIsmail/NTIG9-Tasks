const User = require('../db/models/user.model');
const jwt = require('jsonwebtoken');

const manager = async function (req, res, next) {

    try{
      
        const activeUser = req.user;
        // const passiveUser =  await User.findOne({_id:req.params.id});

        // console.log('req.body', req.body);
        // console.log('activeUser', activeUser);
        // console.log('passiveUser', passiveUser);

        const validAction = activeUser.type;
   
        console.log('activateUser::', activeUser);
        if(!validAction){
            throw new Error('Manager is not allowed to continue this action')
        }

        next();
    }
    catch(e){
        res.status(500).send({
            apistatus:false,
            data:e.message,
            message:"Manager not allowed"
        })
    }

}

module.exports = manager;
