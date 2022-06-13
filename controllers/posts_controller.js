const Post=require('../models/posts');
const Comment=require('../models/comment');
module.exports.create=function(req,res){
Post.create({
    content:req.body.content,
    user: req.user._id
},function(err,post){
    if(err){
        console.log('error in creating post');
        return;
    }
    return res.redirect('/');
});
}

module.exports.destroy=function(req,res){
    Post.findByIdAndDelete(req.params.id,function(err,post){
        // autherization to delete post
        // .id means converting objectid into string
        if(post.user==req.user.id){
            // delete post
             post.remove();
             // delete comments of post
             Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('/');
             })
        }
        else{
            return res.redirect('/');
        }
    })
}

