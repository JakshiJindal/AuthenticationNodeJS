const Comment = require('../models/comment');
const Post = require('../models/posts');

module.exports.create = async function(req, res){
    try{
        let post=await Post.findById(req.body.post);

        if (post){
           let comment=await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
                // handle error

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            }
    }
        catch(err){
            console.log('error',err);
            return;
        }
}
module.exports.destroy=function(req,res){

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