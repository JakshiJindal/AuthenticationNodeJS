const Post=require('../models/posts');
const Comment=require('../models/comment');
module.exports.create=async function(req,res){

try{   
     let post=await Post.create({
    content:req.body.content,
    user: req.user._id
});
if(req.xhr){
    return res.status(200).json({
        data:{
            post:post
        },
        message:"Post Created!"
    })
}
req.flash('success','Post Published');
return res.redirect('/');
}catch(err){
    req.flash('error',err);
    return;
}
}

module.exports.destroy=async function(req,res){
  try{
    let post=  await Post.findByIdAndDelete(req.params.id);
        // autherization to delete post
        // .id means converting objectid into string
        if(post.user==req.user.id){
            // delete post
             post.remove();
             // delete comments of post
            await Comment.deleteMany({post:req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post Deleted!"
                });
            }
            req.flash('success','Post and associated comment deleted');
             
            return res.redirect('/');
        }
        else{
req.flash('error','You cannot delete this post');

            return res.redirect('/');
        }
    }catch(err){
req.flash('error',err);

        return;
    }
}

