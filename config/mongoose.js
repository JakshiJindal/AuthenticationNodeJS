const mongoose=require('mongoose');
 
//connect to database
mongoose.connect('mongodb://localhost/authntication');

//aquire connection
const db= mongoose.connection;

//error
db.on('error',function(err){
    console.log('db not able to connect');
})

//up and running then print message
db.once('open',function(){
    console.log('successfully connected');
})