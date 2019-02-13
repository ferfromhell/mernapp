 
const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

var UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    validate: validate({
      validator: 'isLength',
      arguments: [2, 50],
      message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    })
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
    validate: validate({
      validator: 'isEmail',
      message: 'Should be a valid email address'
    })
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  occupation:{
    type: String,
    //default: ""
  }
});

UserSchema.methods.hashPassword = function(password) {
  return bcrypt.hashSync(password, 12);
};
UserSchema.methods.comparePassword = function(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
};
const User = mongoose.model("User", UserSchema);
module.exports = User;