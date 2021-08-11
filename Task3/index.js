const yargs = require('yargs')
const functions = require('./myFunctions');

yargs.command({
    command:"addCustomer",
    describe:"add new customer",
    builder:{
        name:{ demandOption:true, type:"string"},
        balance:{demandOption:true, type:"number"},
    },
    handler:function(argv){ functions.addData(argv)}
})

yargs.command({
    command:"deposit",
    describe:"deposit",
    builder:{
        balance: { demandOption:true,type:"number"},
        accNum: { demandOption:true,type:"number"}
    },
    handler:function(argv){ functions.deposit(argv)}
})

yargs.command({
    command:"withdraw",
    describe:"withdraw",
    builder:{
        balance: { demandOption:true,type:"number"},
        accNum: { demandOption:true,type:"number"}
    },
    handler:function(argv){ functions.withdraw(argv)}
})

yargs.command({
    command:"updateStatus",
    describe:"update status",
    builder:{
        status: { demandOption:true,type:"boolean"},
        accNum: { demandOption:true,type:"number"}
    },
    handler:function(argv){ functions.updateStatue(argv)}
})

yargs.command({
    command:"showAll",
    describe:"show All customers",
    handler:function(){ functions.showAll()}
})

yargs.command({
    command:"searchCustomer",
    describe:"search customer",
    builder:{
        key:{ type:"string"}
    },
    handler:function(argv){ functions.searchData(argv)}
})

yargs.command({
    command:"delete",
    describe:"delete",
    builder:{
        accNum:{type:"number"}
    },
    handler:function(argv){ functions.delete(argv)}
})

yargs.argv