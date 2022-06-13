const User=require('../models/user');

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}
//render sign up page
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"codial | Sign up"
    })
}

// render sign in page
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'Codial | Sign in'
    })
}

//get sign up data
module.exports.create=function(req,res){
    // match password with confirm one then move on
  if(req.body.password!=req.body.confirm_password){
    console.log(req.body);
      return res.redirect('/users/sign-up');
  }
//   find user by email id
  User.findOne({username:req.body.email},function(err,user){
    if(err){
      console.log('error in finding user');
      return;
      }
      console.log(req.body.email);
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
    console.log(user);
            return res.redirect('/users/sign-up');
        }
  })
}

// sign in and create session
module.exports.createSession=function(req,res){
    // steps to authenticate using passport
  return res.redirect('/');
}
module.exports.destroySession=function(req,res){
    req.logout();

    return res.redirect('/');
}