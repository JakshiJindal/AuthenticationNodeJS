const Post=require('../../../models/posts');
const Comment=require('../../../models/comment');
module.exports.index=async function(req,res){
    let posts=await Post.find({}).sort('-createdAt').populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
    return res.json(200,{
        message:"List of Posts",
        posts:posts
    })
}
module.exports.destroy=async function(req,res){
    try{
      let post=  await Post.findByIdAndDelete(req.params.id);
          // autherization to delete post
          // .id means converting objectid into string
        //   if(post.user==req.user.id){
              // delete post
               post.remove();
               // delete comments of post
              await Comment.deleteMany({post:req.params.id});
            //   if(req.xhr){
                //   return res.status(200).json({
                //       data:{
                //           post_id:req.params.id
                //       },
                //       message:"Post Deleted!"
                //   });
            //   }
            //   req.flash('success','Post and associated comment deleted');
               
              return res.json(200,{message:"post and associated deleted successfully"
              });
        //   }
//           else{
//   req.flash('error','You cannot delete this post');
  
//               return res.redirect('/');
//           }
      }catch(err){
//   req.flash('error',err);
  
          return res.json(500,{
            message:'internal server error'
          });
      }
  }