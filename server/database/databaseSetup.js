const mongoose = require('mongoose');
require('dotenv').config();
const mongodbUrl = process.env.MONGO_URL||'mongodb+srv://shiv1540:ZRihWK3BviV8Ddgu@fullstack.a4js1.mongodb.net/kartz';
// const mongoUrl = 'mongodb://localhost:27017/authentication_authorization';
// const database = require('./database/databaseSetup');
mongoose.connect(mongodbUrl,{
 
});
// useNewUrlParser: true,
// useUnifiedTopology: true,

const db = mongoose.connection;

// event listener
db.on('connected', () => {
    console.log('successfully connected to mongodb server');
});

db.on('error', (err)=>{
    console.log('Error occured: ', err);
})

module.exports = db;