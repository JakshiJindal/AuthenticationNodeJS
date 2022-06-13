const Comment = require('../models/comment');
const Post = require('../models/posts');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle error

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }

    });
}
module.exports.destroy=function(req,res){
    console.log(req.params,req.user);

    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){
            let postid=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('/');
            })
        }
        else{
             return res.redirect('/');
        }
    })
}