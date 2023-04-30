const mongoose = require("mongoose");
const Schema = mongoose.Schema
const taskSchema = new Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    taskCompleted:{
        type:Boolean,
        default:false
    },
   taskStart:{
        type: Boolean,
       default:false
    },
    userId:{
        type: Schema.Types.ObjectId,
         ref: "users",
    },
}, {
    timestamps: true
}
)
const taskModel = mongoose.model('task', taskSchema);
module.exports = taskModel;