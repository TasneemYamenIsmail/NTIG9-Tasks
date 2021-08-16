const fs = require('fs')
let data = [];

function readData(){
    try{
        data = JSON.parse(fs.readFileSync('src/models/customers.json').toString())
        if(!Array.isArray(data)) throw new Error('')
    }
    catch(e){
        data=[]
    }
}

function  writeData(){
    fs.writeFileSync('src/models/customers.json', JSON.stringify(data))
}


class Customer{
    addData(name,balance){ 
        let customer = { 
            accNum: new Date().getTime(), 
            name, 
            balance, 
            status:true
        }
        readData()
        try{
            if(this.validateData(customer))
            {
                data.push(customer);
                writeData();
                this.getAll();
            } else { 
                throw new Error('Cannot Add Customer')
            }
        } catch(e){
            return e;
        }
    
    }

    validateData(newCustomer){
        let valid = false
        if(newCustomer.status && newCustomer.balance<=10000 && this.isNewCustomer(newCustomer))
            valid = true
        return valid
    }

    isNewCustomer(newCustomer){
        let index = data.findIndex(customer=>{
            return customer.accNum === newCustomer.accNum || customer.name === newCustomer.name })
        if(index===-1) return true
        else return false
    }

    getAll(){
        readData()
        return data;
    }

    deposit(accNum,balance){
        readData()
        let customer = this.searchData(accNum);
        balance= Number(balance)
        try{
            if(balance > 10000||!customer||!customer.status)
            {
                throw new Error('Deposite Failure')

            } else { 
                this.updateCustomer(accNum,balance,true);
            }
        } catch(e){
            return e;
        }
    }

    withdraw(accNum,balance){
        readData()
        let customer = this.searchData(accNum)
        balance= Number(balance)
        try{
            if(balance > 5000||!customer||balance> Number(customer.balance)||!customer.status)
            {
                throw new Error('Withdrawal Failure')

            } else { 
                this.updateCustomer(accNum,balance,false);

            }
        } catch(e){
            return e;
        }
    }

    updateCustomer(accNum, balance, isDeposite){
        readData()
        const index =this.searchIndex(accNum);
        if(index!==-1) {
            if(data[index].balance){
                if(isDeposite) data[index].balance= Number(data[index].balance) + balance;
                else data[index].balance=Number(data[index].balance) - balance;
            }
            else data[index].balance= balance
            writeData()
            this.getAll();
        }
    }

    editCustomer(accNum, balance){
        readData()
        const index =this.searchIndex(accNum);
        const customer =this.searchData(accNum);
    
        balance= Number(balance)
        try{
            if(index!==-1 && customer.status && balance<=10000)
            {
                data[index].balance= balance;
                writeData()
                this.getAll();

            } else { 
                throw new Error('Cannot Edit Customer')

            }
        } catch(e){
            return e;
        }
     
    }

    updateStatus(accNum,status){
        readData()
        const index =this.searchIndex(accNum);
    try{
        if(index!==-1 && status)
            {
                data[index].status=status;
            writeData()
            this.getAll();

            } else { 
                throw new Error('Cannot Update Status')

            }
        } catch(e){
            return e;
        }
       
    }

    searchData(accNum){
        readData()
        let result = data.find(customer=> customer.accNum == accNum )
       return result
    }

    searchIndex(accNum){
        readData()
        let index = data.findIndex(customer=> customer.accNum == accNum )
       return index
    }

    delete(accNum){
        readData()
        let index = this.searchIndex(accNum)
        if(index!==-1) {
            data.splice(index,1)
            writeData()
            this.getAll();
        }
    }
}

const customerObj = new Customer();

module.exports = customerObj