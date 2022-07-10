const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');


// tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID:"899409040445-9pp8it05h9dolpn0u4s69hufelcp84jr.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback",   
},
function(accessToken,refreshToken,profile,done){
    // profile contain user info
    // find a user
    User.findOne({username:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google strategy passport',err);
            return;
        }
        console.log(profile);
        if(user){
            // if found,set this uder as req.user
            return done(null,user);
        }
        else{
            // if not found,create user and set it as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('error in google strategy passport',err);
                    return;   
                }
                return done(null,user);
            });
        }
    })
}
))
module.exports=passport;