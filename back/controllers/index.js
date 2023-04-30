const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();
const taskModel = require("../models/taskModel");
const mongoose = require("mongoose");
const assignModel = require("../models/assignModel");
//registration
const registration = async (req, res) => {
  try {
    let data = req.body;
    console.log(data, "==data===");
    if (!req.body) {
      throw { message: "Missing body parameters." };
    }
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    data.userType = "user";
    if (data.userType == "manger") {
      throw{message:"You are not access"}
    }
      let response = await userModel.create(data);
      if (!response) {
        throw { message: "Something went wrong during Registration" };
      }
      let jwtdata = {
        email: response.email,
        _id: response._id,
      };
      let generateToken = jwt.sign(jwtdata, process.env.JWT_KEY);
      let Jwtres = await userModel.findByIdAndUpdate(
        { _id: response._id },
        { token: generateToken },
        { new: true }
      );
      delete response.password;
      return res.json({
        status: true,
        statusCode: 200,
        message: "Registration successfull",
        isRegistration: true,
        response: Jwtres,
      });
  
  } catch (err) {
    console.log(err, "==err==");
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
      error: err,
    });
  }
};

//login

const login = async (req, res) => {
  try {
    const protocol = req.headers.origin
  console.log(protocol)
    if (!req.body) {
      throw { message: "required body parameters missing" };
    }
    let data = req.body;
    
    if (!data.email) {
      throw { message: "required body parameters: email" };
    }
    let response = await userModel.findOne({ email: data.email }).lean();
    if (!response) {
      throw { message: "Wrong Credentials" };
    }    
    let comparePassword = await bcrypt.compare(
      data.password,
      response.password
    );
    if (!comparePassword) {
      throw { message: "Wrong Credentials" };
    }

    delete response.password;
    return res.json({
      status: true,
      statuscode: 200,
      data: response,
      message: "User Login Successfully",
    });
  } catch (err) {
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
      error: err,
    });
  }
};
//createTask

const createTask = async (req, res) => {
  try {
    let data = req.body;
    console.log(data,"===")
    if (!data.userId) {
      throw { message: "Missing required paramater.:userId" };
    }
    data.userId = mongoose.Types.ObjectId(data.userId);
    const response = await taskModel.create(data);
    console.log(response)
    return res.json({
      status: true,
      statusCode: 200,
      data: response,
    });
  } catch (err) {
    console.log(err);
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
      error: err,
    });
  }
};
const assignTask = async (req, res) => {
  try {
    if (!req.body) {
      throw { message: "Missing required paramater." };
    }
    let data = req.body;
    if (!data.userId) {
      throw { message: "Missing required paramater.:userId" };
    }
    if (!data.taskId) {
      throw { message: "Missing required paramater.:taskId" };
    }
    data.userId = mongoose.Types.ObjectId(data.userId);
    data.taskId = mongoose.Types.ObjectId(data.taskId);
    const response = await assignModel.create(data);
    console.log(response);
    return res.json({
      data: response,
    });
  } catch (err) {
    console.log(err);
  }
};
const deletUser = async (req, res) => {
  try {
    let data = req.query;
    let response = await userModel.findByIdAndUpdate(
      { _id: data.userId },
      { isDeleted: true },{new:true}
    );
    return res.json({
      status: true,
      statuscode: 200,
      data: response,
      message: "user Deleted",
    });
  } catch (err) {
    console.log(err);
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
      Error: err,
    });
  }
};
const activeUser = async (req, res) => {
  try {
    let data = req.query;
    console.log(data,"=====")
    let response = await userModel.findByIdAndUpdate(
      { _id: data.userId },
      { isActive: true },
      { new: true }
    );
    console.log(response,"===response==")
    return res.json({
      status: true,
      statuscode: 200,
      data: response,
      message: "user active",
    });
  } catch (err) {
    console.log(err);
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
      Error: err,
    });
  }
};

const checkUserAssignTask = async (req, res) => {
  try {
    let data = req.query;
    console.log(data)
    if (!data) {
      throw { message: "missing body parameters " };
    }
    let response = await taskModel.find({ userId: data.userId });
    console.log(response)
    return res.json({
      status: true,
      statusCode: 200,
      data: response,
    });
  } catch (err) {
    console.log(err);
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
      Error: err,
    });
  }
};
const checkAllTask = async (req, res) => {
  try {
    let payload = {};
    const response = await assignModel.find(payload).lean();
    return res.json({
      status: true,
      statusCode: 200,
      data: response,
    });
  } catch (err) {
    console.log(err);
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
      Error: err,
    });
  }
};
 //search user 
  const search =  async(req,res)=>{
    try{
      let data =  req.query
      console.log(data)
      if(!data){
        throw{message:"missing body parameters"}
      }
      let response =  await userModel.find({firstName: { '$regex': `${data.firstName}`, '$options': 'i' }}, {},{isDeleted:false})
      console.log(response)
      return res.json({
        status:true,
        statusCode:200,
        data:response
      })
 
    }catch(err){
      console.log(err)
    }
  }
//getALlUser

const getAllUser =  async(req,res)=>{
try{
  let data =  req.query
  let payload = {}

  const response = await userModel.find({isDeleted:false})
  return res.json({
    status: true,
    statusCode: 200,
    data: response,
  });
}catch(err){
  console.log(err);
  let message = err && err.message ? err.message : "Something went wrong";
  return res.json({
    status: false,
    statusCode: 400,
    message: message,
    Error: err,
  });
}
}
module.exports = {
  registration,
  login,
  createTask,
  assignTask,
  deletUser,
  activeUser,
  checkUserAssignTask,
  checkAllTask,
  getAllUser,
  search
};
