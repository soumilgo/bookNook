const express=require('express');
const {handleCreateUser, handleGetAllUsers, handleGetUserById, handleUpdateUser, hangleDeleteUser, handleGetUserByEmail} = require('../controllers/userController');
const router=express.Router();

router.post('/create', handleCreateUser);
router.get('/getAll', handleGetAllUsers);
router.get('/get/:id', handleGetUserById);
router.get('/getByEmail', handleGetUserByEmail);
router.put('/update/:id', handleUpdateUser);
router.delete('/delete/:id', hangleDeleteUser);

module.exports=router;