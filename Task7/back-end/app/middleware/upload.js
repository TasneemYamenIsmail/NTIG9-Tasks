const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        //  path.join("uploads",(req.user._id).toString())
        const location = path.join("../front/src/assets/uploads",'')
        fs.mkdir(location, (err)=>{})
        cb(null, location)
    },
    filename: function(req, file, cb){
        let myName = file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        cb(null, myName)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){

        ext = path.extname(file.originalname)
        if(ext=== ".pdf") return callback(new Error('invalid Extension'))
        callback(null, true)
    }
})

module.exports = upload