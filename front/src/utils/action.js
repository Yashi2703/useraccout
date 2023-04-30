import axios from "axios";
const config = require("../envirement/development").config;

//login api
export const loginAction = ({ payload }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.post(`${config.backEnd}/login`, payload);
      return resolve(response.data);
    } catch (err) {
      console.log(err);
      return reject(err);
    }
  });
};

//registration
export const signUpAction = ({ payload }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.post(
        `${config.backEnd}/registration`,
        payload
      );
      return resolve(response.data);
    } catch (err) {
      console.log(err);
      return reject(err);
    }
  });
};

//createTask
export const createtaskAction = ({ payload }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.post(`${config.backEnd}/createtask`, payload);
      return resolve(response.data);
    } catch (err) {
      console.log(err);
      return reject(err);
    }
  });
};

//getAllUser
export const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${config.backEnd}/getalluser`);
      return resolve(response.data);
    } catch (err) {
      return reject(err);
    }
  });
};

//deletUser
export const DeletUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.delete(`${config.backEnd}/deletuser?userId=${id}`);
      return resolve(response.data);
    } catch (err) {
      return reject(err);
    }
  });
};


//activeUser

export const ActiveUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.put(`${config.backEnd}/activeuser?userId=${id}`);
      return resolve(response.data);
    } catch (err) {
      return reject(err);
    }
  });
};

//checkAssignTAsk

export const checkAssignTAsk = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${config.backEnd}/checkassigntask?userId=${id}`);
      return resolve(response.data);
    } catch (err) {
      return reject(err);
    }
  });
};

export const SearchUser =  (values)=>{
  console.log(values,"values")
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${config.backEnd}/search?firstName=${values}`);
      return resolve(response.data);
    } catch (err) {
      return reject(err);
    }
  });
}

