const {Users, auth} = require('../firebaseAdminConfig');
// const admin = require('firebase-admin');

const signUp = async (data) => {
  try{
    const {email,password,...rest}=data;

    let userExists=false;
    try{
      const ret=await auth.getUserByEmail(email);
      if(ret){
        userExists=true;
      }
    }catch (error){
      userExists=false;
    }

    if(userExists){
      return {msg: 'User already exists', status: 400};
    }
    const user=await auth.createUser({
      email,
      password,
    });
    
    const addUser=await Users.doc(user.uid).set({
      role: 'generalUser',
      email,
      ...rest,
      books: [],
      progress: [],
      reviews: [],
      wishlist: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return {msg: 'User Created', data: {addUser}, status: 201};
    
  } catch (error){
    return {msg: 'Failed to create user', details: error.message, status: 400};
  }
}

const login = async (idToken) => {
  try{
    const decodedToken=await auth.verifyIdToken(idToken);
    const user=await Users.doc(decodedToken.uid).get();
    if(user.exists){
      return {msg: 'User Found', data: {id: user.id, ...user.data()}, status: 200};
    }
    else{
      return {msg: 'User not found', status: 404};
    }
  } catch (error){
    return {msg: 'Failed to get user', details: error.message, status: 400};
  }
}

module.exports={signUp, login};