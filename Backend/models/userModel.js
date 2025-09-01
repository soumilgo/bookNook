const {Users} = require('../firebaseAdminConfig');

const createUser = async (data) => {
  try {
    const doc=await Users.add(data);
    return {msg: 'User Created', docId: doc.id,status: 201};
  } catch (error) {
    return {msg: 'Failed to create user', details: error.message, status: 400};
  }
} 

const getAllUsers=async()=>{
  try{
    const snapshot=await Users.get();
    // console.log(snapshot);
    const users=[];
    snapshot.forEach(user=>{
      users.push({id:user.id,...user.data()}); 
    });
    // console.log(users);
    return {msg: `${users.length} Users Found`, data: users, status: 200};
  } catch (error){
    return {msg: 'Failed to get users', details: error.message ,status:400};
  }
}

const getUserById=async(id)=>{
  try{
    const docRef=Users.doc(id);
    const docSnap=await docRef.get();
    if(docSnap.exists){
      return {msg:'User found',data:({id:docSnap.id,...docSnap.data()}),status:200};
    } else {
      return {msg: 'User not found',status: 404};
    }
  } catch (error){
    return {msg: 'Failed to get user', details: error.message, status: 400};
  }
}

const getUserByEmail=async(email)=>{
  try{
    const docRef=Users.where('email','==',email);
    const docSnap=await docRef.get();
    if(docSnap.exists){
      return {msg:'User found',data:({id:docSnap.id,...docSnap.data()}),status:200};
    } else {
      return {msg: 'User not found',status: 404};
    }
  } catch(error){
    return {msg: 'Failed to get user', details: error.message, status: 400};
  }
}

const updateUser=async(data)=>{
  try{
    const {id,...userData}=data;
    const docRef=Users.doc(id);
    await docRef.update(userData);
    return {msg: 'User Updated',data: userData,status: 200};
  } catch (error){
    return {msg: 'Failed to update user', details: error.message,status: 400};
  }
}

const deleteUser=async(id)=>{
  try{
    const docRef=Users.doc(id);
    await docRef.delete();
    return {msg: 'User Deleted',status: 200};
  } catch (error){
    return {msg: 'Failed to delete user', details: error.message,status: 400};
  }
}

module.exports = {createUser, getAllUsers, getUserById, updateUser, deleteUser, getUserByEmail};