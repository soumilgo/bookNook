const {createUser,getAllUsers, getUserById, updateUser, deleteUser} = require('../models/userModel');

const handleCreateUser = async (req, res) => {
  const data=req.body;
  const response=await createUser(data);
  res.status(response.status).json(response);
}

const handleGetAllUsers = async (req, res) => {
  const response= await getAllUsers();
  res.status(response.status).json(response);
}

const handleGetUserById = async (req, res) => {
  const id=req.params.id;
  const response= await getUserById(id);
  res.status(response.status).json(response);
}

const handleGetUserByEmail = async (req, res) => {
  const email=req.email;
  const response= await getUserByEmail(email);
  res.status(response.status).json(response);
}

const handleUpdateUser = async (req, res) => {
  const id=req.params.id;
  const data={id,...req.body};
  const response= await updateUser(data);
  res.status(response.status).json(response);
}

const hangleDeleteUser = async (req, res) => {
  const id=req.params.id;
  const response= await deleteUser(id);
  res.status(response.status).json(response);
}

module.exports = {handleCreateUser, handleGetAllUsers, handleGetUserById, handleUpdateUser, hangleDeleteUser, handleGetUserByEmail};