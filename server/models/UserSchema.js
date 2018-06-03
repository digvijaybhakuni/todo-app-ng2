const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const USER_SALT = "USER_HEX_!2#4%";

const userSchema = new mongoose.Schema({
  profile: {
    username: {
      type: String,
      required: true,
      lowercase: true
    },
    picture: {
      type: String,
      required: false,
      match: /^http:\/\//i
    }
  },
  data: {
    oauth: { type: String, required: true },
    password: {
      type: String,
      required: true
    }
  }
});

userSchema.methods.setPassword = function(password){
  try{
    this.data.password = bcrypt.hashSync(password, null);
  }catch(err){
    console.error("error", err);
    throw new Error("Error Encrypting password and setting it ");
  }


  /*let currentUser = this;
  console.log("this >> ", this);
  return bcrypt.hash(password, null, null, (err, res) => {
    console.log("res", res);
    console.log("err", err);
    console.log("this", currentUser);
    if(!err){ currentUser.data.password = res; }
    else { throw new Error("Error Encrypting password and setting it "); }
    console.log("Set password done");
  });*/
}

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.data.password);
}

userSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
     username: this.profile.username,
     exp: parseInt(expiry.getTime() / 1000),
  }, "SECRET_X");
}

userSchema.methods.toObjectId = function (strId) {
  return mongoose.Types.ObjectId(strId);
}

module.exports = userSchema;
module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
