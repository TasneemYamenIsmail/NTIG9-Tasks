const express = require('express');
const app = require('../src/app');
const router = express.Router();

const customerController = require('../src/controllers/customer.controller');

router.get("",(req,res)=>{
    res.redirect('/allCustomers')
    
})

router.get("/allCustomers",(req,res)=>{
    const allCustomers = customerController.getAll();

    res.render('all',{
        title: 'All Customers',
        allCustomers,
        showEmpty: allCustomers.length > 0 ? false : true
    })
    
})

router.get("/add",(req,res)=>{
    res.render('add',{
        title: 'Add Customer'
    }) 
})

router.post("/add",(req,res)=>{
    const error = customerController.addData(req.body.name,req.body.balance)
    console.log('err:',error)
    const customer ={
        name:req.body.name,
        balance:req.body.balance,
    }
    if(error) {
        res.render('add',{
            title: 'Add Customer',
            customer,
            error: String(error).replace('Error: ','')
        })
    } else {
        res.redirect('/allCustomers')
    }
})

router.get("/edit/:accNum/:editType",(req,res)=>{
    const customer = customerController.searchData(req.params.accNum);
    console.log('req.params.editType:',req.params.editType)
    res.render('edit',{
        title: 'Edit Customer',
        customer,
        type: req.params.editType,
        isDisabledStatus: req.params.editType!=3? true: false,
        isDisabledBalance: req.params.editType!=0? true: false
    }) 
})

router.post("/edit/:accNum/:editType",(req,res)=>{
    console.log('req::', req.params);
    let error=''
    switch(req.params.editType){
        case '0':
            console.log('0')
           error = customerController.editCustomer(req.params.accNum,req.body.balance);
            break;
        case '1':
            console.log('1')

            error = customerController.withdraw(req.params.accNum,req.body.withdrawal)
            break;
        case '2':
            console.log('2')

           error = customerController.deposit(req.params.accNum,req.body.deposite)
            break;
        case '3':
            console.log('3')

           error = customerController.updateStatus(req.params.accNum,req.body.status)
            break;
        
    }

    if(error) {
    console.log('error:',error)
        const customer = customerController.searchData(req.params.accNum);
        res.render('edit',{
            title: 'Edit Customer',
            customer,
            type: req.params.editType,
            isDisabledStatus: req.params.editType!=3? true: false,
            isDisabledBalance: req.params.editType!=0? true: false,
            error: String(error).replace('Error: ','')

        }) 
    } else {
        res.redirect('/allCustomers')
    }
})

router.get("/delete/:accNum",(req,res)=>{
    customerController.delete(req.params.accNum)
    res.redirect('/allCustomers')    
})

module.exports = router;
