const mongoose =  require('mongoose');
const dotenv  = require("dotenv");
dotenv.config()
const connectDataBase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongodb connected with server ${data.connection.host}`);
    })
    .catch((err) => {
      console.log("error in mongodb",err);
    });
};

module.exports = 
    connectDataBase