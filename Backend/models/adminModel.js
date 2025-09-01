const {Admin}=require('../firebaseAdminConfig');

const addAdminReview=async(data)=>{
  try{
    const doc=await Admin.add(data);
    return {msg: 'Admin Review Added', docId: doc.id, status: 201};
  }catch(error){
    return {msg: 'Failed to add admin review', details: error.message, status: 400};
  }
}

module.exports={addAdminReview};