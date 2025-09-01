const {Feedback} =require('../firebaseAdminConfig');

const addRequestForBooks=async(data)=>{
  try{
    const doc=await Feedback.add(data);
    return {msg: 'Feedback Added', docId: doc.id, status: 201};
  }catch(error){
    return {msg: 'Failed to add feedback', details: error.message, status: 400};
  }
}

const deleteRequestForBooks=async(id)=>{
  try{
    const docRef=Feedback.doc(id);
    await docRef.delete();
    return {msg: 'Feedback Deleted', status: 200};
  }catch(error){
    return {msg: 'Failed to delete feedback', details: error.message, status: 400};
  }
}

const addReview=async(data)=>{
  try{

    const doc=await Feedback.add(data);
    return {msg: 'Review Added', docId: doc.id, status: 201};
  }catch(error){
    return {msg: 'Failed to add review', details: error.message, status: 400};
  }
}


module.exports={addRequestForBooks,deleteRequestForBooks,addReview};
