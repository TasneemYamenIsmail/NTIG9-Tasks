const {MongoClient}= require('mongodb')

const myConnection =(callback)=>{
    MongoClient.connect('mongodb://localhost:27017',{},(err,client)=>{
        if(err) return callback(err,false)
        const db = client.db('tasks')
        callback(false,db);
    })
}

module.exports = myConnection;