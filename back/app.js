const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDataBase = require("./database/database");
const router = require("./router/index");
const bcrypt = require("bcrypt");
const app = express();
const userModel = require("./models/userModel");
app.use(cors());
app.use(express.json());
app.use(router);

dotenv.config();
connectDataBase();
const port = process.env.PORT || 8016;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
bcrypt.genSalt(10, function(err, salt) {
  bcrypt.hash(process.env.ADMIN_PASSWORD, salt, function(err, hash) {
    var user = {
      firstName: "Admin",
      lastName: "",
      email: "admin@dainsta.com",
      password: hash,
      isVerified:true,
      userType:"manager"
    }
    userModel.findOne({email:user.email},function(err, result){

      if(result=='null' || result==null)
      {
        userModel.create(user, function(e) {
            if (e) {
                console.log("===Admin user not created==",e);
            }
        });
      }
   });
  });
});
