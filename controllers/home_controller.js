const authentication = require('../models/authenticate');
const User=require('../models/authenticate');

// get TODOS list using get request
module.exports.getTODO=function(req,res){
    return res.render('home',{
        title:'Home'
    })
}
module.exports.profile=function(req,res){
    if(req.cookies.user_id){
    User.findById(req.cookies.user_id,function(err,user){
        if(user){
            return res.render('user_profile',{
                title:'Profile',
                user:user
            })
        }
    })
}
else{
    // by mine mehtod using query params
    // return res.render('user_profile',{
    //     title:'Profile',
    //     username:req.query.username,
    //     password:req.query.password
    // })
    return res.redirect('/users/sign-in');
}
}