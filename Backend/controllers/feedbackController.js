const {addRequestForBooks,deleteRequestForBooks,addReview}=require('../models/feedbackModel');
const {addAdminReview}=require('../models/adminModel');

const handleAddRequestForBooks=async(req,res)=>{
  try{
    const data={
      type: 'request',
      userId: req.body.userId,
      bookName: req.body.bookName,
      author: req.body.author,
      publication: req.body.publication,
      edition: req.body.edition,
      neededBy: req.body.neededBy,
    }
    const response=await addRequestForBooks(data);
    res.status(response.status).json(response);
  }catch(error){
    res.status(500).json({msg: 'Internal Server Error', details: error.message});
  }
}

const handleDeleteRequestForBooks=async(req,res)=>{
  try{
    const id=req.body.id;
    const response=await deleteRequestForBooks(id);
    res.status(response.status).json(response);
  }catch(error){
    res.status(500).json({msg: 'Internal Server Error', details: error.message});
  }
}

const handleAddReview=async(req,res)=>{
  try{
    const data=req.body;
    if(data.type=='admin'){
      const response=await addAdminReview(data);
      res.status(response.status).json(response);
    }
    else{
      const response=await addReview(data);
      res.status(response.status).json(response);
    }
  } catch(error){
    res.status(500).json({msg: 'Internal Server Error', details: error.message});
  }
}

module.exports={handleAddRequestForBooks,handleDeleteRequestForBooks,handleAddReview};