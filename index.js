const express=require('express');
const path=require('path');
const db=require('./config/mongoose');
const cookieParser=require('cookie-parser');

const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);
app.use(cookieParser());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.urlencoded());

app.use(express.static(path.join(__dirname,'./assets')));


app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    console.log('app listen to',port);
});