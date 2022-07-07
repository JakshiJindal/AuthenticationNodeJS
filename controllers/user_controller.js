const User=require('../models/user');
const fs=require('fs');
const path=require('path');
module.exports.profile = function(req, res){
  User.findById(req.params.id,function(err,user){
    return res.render('user_profile', {
      title: 'User Profile',
      profile_user:user
  })
  })
}
module.exports.update=async function(req,res){
  // if(req.user.id===req.params.id){
  //   User.findByIdAndUpdate(req.params.id,{name:req.body.name,username:req.body.email},function(err,user){
  //     return res.redirect('/');
  //   });
  // }
  //   else{
  //     return res.status(401).send('Unauthorized');
  //   }
  if(req.user.id===req.params.id){
try{
  let user=await User.findById(req.params.id);
  User.uploadedAvatar(req,res,function(err){
    if(err){
      console.log('******Multer error',err);
    }
    console.log(req.file);
    user.name=req.body.name;
    user.email=req.body.email;
    if(req.file){
      if(user.avatar){
        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
      }
      // this is saving path of uploaded file into avatar field in user
      user.avatar=User.avatarPath+'/'+req.file.filename;
    }
    user.save();
    return res.redirect('/');
  });
}catch(err){
  return res.redirect('/');
}
  }
  else{
return res.status(401).send('Unauthorized');
  }
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
      return res.redirect('/users/sign-up');
  }
//   find user by email id
  User.findOne({username:req.body.email},function(err,user){
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
    // steps to authenticate using passport
    req.flash('success','Logged in Successfully');
  return res.redirect('/');
}
module.exports.destroySession=function(req,res){
    req.logout(err=>{
      if(err){
        return;
      }
      else{
    req.flash('success','You have logged out!');
        return res.redirect('/');
      }
    });
}