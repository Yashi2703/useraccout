const mongoose = require("mongoose");
const Schema = mongoose.Schema
const assignSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
         ref: "users",
    },
    taskId:{
        type: Schema.Types.ObjectId,
         ref: "tasks",
    }
}, {
    timestamps: true
}
)
const assignModel = mongoose.model('assign', assignSchema);
module.exports = assignModel;