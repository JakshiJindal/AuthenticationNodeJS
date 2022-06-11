const Post=require('../models/posts');
// get TODOS list using get request
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

//     Post.find({},function(err,posts){
//     return res.render('home', {
//         title: "Codial|Home",
//         posts:posts
//     });
// });
//populate user of each post
Post.find({}).populate('user').exec(function(err,posts){
    console.log('postssss',posts);
    return res.render('home', {
        title: "Codial|Home",
        posts:posts
    });
})
}
