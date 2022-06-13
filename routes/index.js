const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
const users=require('./users');
// home page will show TODO list and form 
router.get('/',homeController.home);
//route to add TODO in list
router.use('/users',users);
router.use('/posts',require('./posts'));
router.use('/comment',require('./comments'));
module.exports=router;
