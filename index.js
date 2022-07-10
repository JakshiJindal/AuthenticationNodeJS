const express=require('express');
const path=require('path');
const db=require('./config/mongoose');
const session=require('express-session');
const MongoStore=require('connect-mongo');
//used for session cookie
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const sassMiddleware=require('node-sass-middleware');
const cookieParser=require('cookie-parser');
// flash messages
const flash=require('connect-flash');
const customMware=require('./config/middleware');

const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);
app.use(cookieParser());
// make the upload paths avaliable to browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// mongo store is used to store the session cookie in db
app.use(session({
name:'codial',
// TODO change secreat before deployment in production code
secret:'blahsomthing',
saveUninitialized:false,
// did not create another cookie for already exisited user
resave:false,
cookie:{
    // num of mins in ms
    maxAge:(1000*60*100)
},
store: MongoStore.create({
        mongoUrl:'mongodb://localhost/authntication',
        autoRemove:'disabled'
},function(err){
    console.log(err||'mongo connect is ok');
}
)
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// add flash as middleware after setting passport middleware
app.use(flash());
app.use(customMware.setFlash);

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