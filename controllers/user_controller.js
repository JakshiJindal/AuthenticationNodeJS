const authentication = require('../models/authenticate');
const User=require('../models/authenticate');
module.exports.signup=function(req,res){
    return res.render('user_profile',{
        title:"codial | Sign up"
    })
}
//render sign up page
module.exports.signup=function(req,res){
    return res.render('user_sign_up',{
        title:"codial | Sign up"
    })
}

// render sign in page
module.exports.signin=function(req,res){
    return res.render('user_sign_in',{
        title:'Codial | Sign in'
    })
}

//get sign up data
module.exports.create=function(req,res){
    console.log(req.body);
    // match password with confirm one then move on
  if(req.body.password!=req.body.confirm_password){
      return res.redirect('/users/sign-up');
  }
//   find user by email id
  User.findOne({email:req.body.email},function(err,user){
    if(err){
      console.log('error in finding user');
      return;
      }
    //   if user not present create user
      if(!user){
          User.create({username:req.body.email,password:req.body.password,name:req.body.name}
            ,function(err,user){
              if(err){
                  console.log('error in creating user');
                  return;
              }
      return res.redirect('/users/sign-in');
            })
        }
        // if user already present go to sign-up page
        else{
            return res.redirect('/users/sign-up');
        }
  })
}

// sign in and create session
module.exports.createSession=function(req,res){
    // steps to authenticate 
    // find user
User.findOne({email:req.body.email},function(err,user){
    if(err){
        console.log('error in finding user in siging in');
        return;
        }

    // handle user found
    if(user){

       //handle password which doesn't match
       if(user.password!=req.body.password){
        return res.redirect('/users/sign-in');
    }
       // handle session creation
       res.cookie('user_id',user.id);
       return res.redirect('/profile?username='+req.body.email+'&password='+req.body.password);
   }else{

      //handle user not found

      return res.redirect('/users/sign-in');
 }
});

}