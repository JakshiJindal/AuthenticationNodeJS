const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // include the array of ids of all comments inthis post schema itself
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
},{
    timestamps:true
});
const Post=mongoose.model('Post',postSchema);

module.exports=Post;