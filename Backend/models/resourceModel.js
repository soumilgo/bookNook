const {Resources}=require('../firebaseAdminConfig');

const addResource=async(data)=>{
  try{
    const doc=await Resources.add(data);
    return {msg: 'Resource Added', docId: doc.id, status: 201};
  } catch (error){
    return {msg: 'Failed to add resource', details: error.message, status: 400};
  }
}

const getAllResources=async()=>{
  try{
    const snapshot=await Resources.get();
    const resources=[];
    snapshot.forEach(resource=>{
      resources.push({id:resource.id,...resource.data()});
    });
    return {msg: `${resources.length} Resources Found`, data: resources, status: 200};
  } catch (error){
    return {msg: 'Failed to get resources', details: error.message, status: 400};
  }
}

const getResourceById=async(id)=>{
  try{
    docRef=Resources.doc(id);
    docSnap=await docRef.get();
    if(docSnap.exists){
      return {msg: 'Resource Found', data: {id: docSnap.id, ...docSnap.data()}, status: 200};
    } else {
      return {msg: 'Resource not found', status: 404};
    }
  } catch (error){
    return {msg: 'Failed to get resource', details: error.message, status: 400};
  }
}

const updateResource=async(data)=>{
  try{
    const {id,...resourceData}=data;
    const docRef=Resources.doc(id);
    await docRef.update(resourceData);
    return {msg: 'Resource Updated', data: resourceData, status: 200};
  } catch (error){
    return {msg: 'Failed to update resource', details: error.message, status: 400};
  }
}

const updateResourceRating=async(id,rating)=>{
  try{
    const docRef=Resources.doc(id);
    const docSnap=await docRef.get();
    if(!docSnap.exists){
      return {msg: 'Resource not found', status: 404};
    }
    const oldRating=docSnap.data().userRating;
    const userRated=docSnap.data().numUserRated;
    const newRating=(Number(oldRating)*Number(userRated)+Number(rating))/(Number(userRated)+1);
    
    const data=docSnap.data();
    data.userRating=Number(newRating);
    data.numUserRated=Number(userRated+1);
    await docRef.update(data);
    return {msg: 'Resource Rating Updated', status: 200};
  } catch (error){
    return {msg: 'Failed to update resource rating', details: error.message, status: 400};
  }
}

const deleteResource=async(id)=>{
  try{
    const docRef=Resources.doc(id);
    await docRef.delete();
    return {msg: 'Resource Deleted', status: 200};
  } catch (error){
    return {msg: 'Failed to delete resource', details: error.message, status: 400};
  }
}

module.exports={addResource, getAllResources, getResourceById, updateResource,updateResourceRating, deleteResource};