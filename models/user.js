const mongoose=require('mongoose');

//create schema
const authenticateSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String
    }
})

const User=mongoose.model('User',authenticateSchema);

module.exports= User;