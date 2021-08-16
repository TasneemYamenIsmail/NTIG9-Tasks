const express = require('express');

const router = express.Router();
const dbConnection = require('../src/controllers/dbConnection');
const taskController = require('../src/controllers/tasks.controllers');

const {ObjectId}=require('mongodb');

router.get("",(req,res)=>{
    res.redirect('/all')
})

router.get("/all",(req,res)=>{

dbConnection((error,response)=>{
    if (error) res.send('database error')
    response.collection('tasks').find().toArray((err,data)=>{
        if(err) res.send(err)
        res.render('all',{
            title: 'All Tasks',
            allTasks:data,
            showEmpty: data.length > 0 ? false : true
        })
    })
})

})

router.get('/add', (req,res)=>{
    res.render('single',{
        title: 'Add New Task',
        btnTitle:'Add'
    }) 
})

router.post('/add', (req,res)=>{
    data = req.body
    dbConnection((error, response)=>{
        if(error) res.send('database error')
        response.collection('tasks').insertOne(data, (e,d)=>{
            if(e) res.send(e)
            res.redirect('/all')
        })
    })
})

router.get('/delete/:id', (req,res)=>{
    dbConnection((error, response)=>{
        if(error) res.send('database error')
        response.collection('tasks').deleteOne({_id: new ObjectId(req.params.id)})
        .then(()=>res.redirect('/all'))
        .catch(()=> res.send('Cannot Delete'))
    })
})

router.get('/edit/:id', (req,res)=>{
   id = req.params.id
   dbConnection((error,response)=>{
       if(error) res.send('database error')
       else{
           response.collection('tasks').findOne({_id: new ObjectId(id)},(err,data)=>{
               if(err) res.send(err)
               res.render('single',{
                   title: 'Edit Data',
                   task: data,
                   btnTitle:'Edit'
               }) 
           })
           
       }
   })
})

router.post('/edit/:id', (req,res)=>{
   id = req.params.id
    data = req.body
    dbConnection((error, response)=>{
        if(error) res.send('database error')
        response.collection('tasks').updateOne({_id: new ObjectId(id)}, {$set:data})
        .then(()=>res.redirect('/all'))
        .catch(()=> res.send('Cannot Edit'))
    })
})

module.exports = router