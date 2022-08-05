var MONGOOSE = require('../config/gifnoc');
const userSchema = new MONGOOSE.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  userName:{
    type: String,
    default:""
  }
});
module.exports = MONGOOSE.model("sresu", userSchema); 


