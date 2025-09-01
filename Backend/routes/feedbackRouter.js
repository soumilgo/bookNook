const express=require('express');
const router=express.Router();

const {handleAddRequestForBooks,handleDeleteRequestForBooks,handleAddReview}=require('../controllers/feedbackController');

router.post('/addRequestForBooks', handleAddRequestForBooks);
router.delete('/deleteRequestForBooks', handleDeleteRequestForBooks);
router.post('/addReview', handleAddReview);

module.exports=router;