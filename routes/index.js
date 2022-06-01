const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
const users=require('./users');
// home page will show TODO list and form 
router.get('/',homeController.getTODO);
router.get('/profile',homeController.profile);
//route to add TODO in list
router.use('/users',users);

module.exports=router;
