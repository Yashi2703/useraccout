const mongoose = require("mongoose");
const Schema = mongoose.Schema
const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    userType: {
        type: String,
        enum: ["user", "manager"],
      },
      isDeleted: {
        type: Boolean,
        default:false
      },
      isActive:{
          type:Boolean,
          default:false
      },
    token: {
        type: String,
      }
}, {
    timestamps: true
}
)
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;