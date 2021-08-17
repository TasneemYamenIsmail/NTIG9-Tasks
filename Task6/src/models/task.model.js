const mongoose = require('mongoose');
const validator = require('validator');

const Task = mongoose.model('Task', {
    title: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        validate(value){
            if(value< new Date()) throw new Error('Invalid Due Date')
        }
    }
})

module.exports = Task