const user = require("../models/userModel")
module.exports = auth = async (req, res, next) => {
  try {
    let authToken = req.headers.authorization?.split(" ").pop();
   
   
    if (!authToken) {
      throw "Missing authorization token.";
    }
    let findToken = await user.findOne({token:authToken});
   
    if (!findToken) {
      return res.json("authorization Falied Not a valid token");
    }
    next();
  } catch (err) {
    let error = err ? err : "something went wrong";
    console.log(error);
    return res.json({ status: false, statusCode: 400, error: error });
  }
};