const fs = require('fs')

class Customer {
    myData = null
    readData(){
        try{
            this.myData = JSON.parse(fs.readFileSync('customers.json').toString())
            if(!Array.isArray(this.myData)) throw new Error('')
        }
        catch(e){
            this.myData=[]
        }
    }

    writeData(){
        fs.writeFileSync('customers.json', JSON.stringify(this.myData))
    }

    addData(data){ 
        let customer = { 
            accNum: new Date().getTime(), 
            name:data.name, 
            balance:data.balance, 
            status:true
        }
        this.readData()
        if(this.validateData(customer))
        {
            this.myData.push(customer);
            this.writeData();
            this.showAll();
        } else { 
           return console.log('Cannot add Customer')
        }
      
        
    }

    validateData(newCustomer){
        let valid = false
        if(newCustomer.status && newCustomer.balance<=10000 && this.isNewCustomer(newCustomer))
            valid = true
        return valid
    }

    isNewCustomer(newCustomer){
        let index = this.myData.findIndex(customer=>{
            return customer.accNum === newCustomer.accNum || customer.name === newCustomer.name })
        if(index===-1) return true
        else return false
    }

    showAll(){
        this.readData()
        this.myData.forEach(customer=>{
            console.log(`${customer.accNum} - ${customer.name} - ${customer.balance} - ${customer.status}`)
        })
    }

    deposit(argv){
        const balance = argv.balance;
        const accNum = argv.accNum;
        this.readData()
        let customer = this.myData.find(customer=> customer[accNum] == argv[accNum] )
        if(balance > 10000||!customer||!customer.status){
            return console.log('Deposit Failure')
        }
        else{
            this.updateCustomer(accNum,balance,true);

        }
    }


    withdraw(argv){
        const balance = argv.balance;
        const accNum = argv.accNum;
        this.readData()
        let customer = this.myData.find(customer=> customer[accNum] == argv[accNum] )
        if(balance > 5000||!customer||balance>customer.balance||!customer.status){
            return console.log('Withdrawal Failure')
        }
        else{
            this.updateCustomer(accNum,balance,false);

        }
    }

    updateCustomer(accNum,balance, isDeposite){
        this.readData()
        let index = this.myData.findIndex(customer =>  customer.accNum== accNum)
        if(index===-1) return console.log('Customer Not Found');
        else{
            if(isDeposite) this.myData[index].balance=this.myData[index].balance + balance;
            else this.myData[index].balance=this.myData[index].balance - balance;
            this.writeData()
            this.showAll();
        }
    }

    updateStatue(argv){
        const status = argv.status;
        const accNum = argv.accNum;
        this.readData()
        let index = this.myData.findIndex(customer =>  customer.accNum== accNum)
        if(index===-1) return console.log('Customer Not Found');
        else {
            this.myData[index].status=status;
            this.writeData()
            this.showAll();

        }
    }

    searchData(argv){
        let searchKey = null
        
        for(let key in argv)  {
            if(key!="_" && key!="$0") {
                searchKey = key
            }
        }
        this.readData()
        let result = this.myData.filter(customer=> customer[searchKey] == argv[searchKey] )
       if(result && result.length){ 
           result.forEach(customer=>{
            console.log(`${customer.accNum} - ${customer.name} - ${customer.balance} - ${customer.status}`)
        })   
        } else {
           return console.log('Customer Not Found')
        }

    }

    delete(argv){
        this.readData()
        let index = this.myData.findIndex(task =>  task.accNum== argv.accNum)
        if(index==-1) return console.log('Customer Not Found');
        this.myData.splice(index,1)
        this.writeData()
        this.showAll();
    }

}

let customer = new Customer()
module.exports = customer
