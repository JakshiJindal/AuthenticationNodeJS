const Post=require('../models/posts');
const User=require('../models/user');
// get TODOS list using get request
module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

//     Post.find({},function(err,posts){
//     return res.render('home', {
//         title: "Codial|Home",
//         posts:posts
//     });
// });
//populate user of each post
try{
let posts=await Post.find({}).sort('-createdAt').populate('user')
.populate({
    path:'comments',
    populate:{
        path:'user'
    }
});
let users=await User.find({});
          return res.render('home', {
        title: "Codial|Home",
        posts:posts,
        all_users:users
    });
}catch(err){
    console.log("error",err);
    return;
}
}
