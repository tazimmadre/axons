const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type:String },
  lastName: {type: String },
  mobileNo: { type:Number },
  address: { type:String },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
