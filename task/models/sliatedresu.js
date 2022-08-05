var MONGOOSE = require('../config/gifnoc');
const userDetailsSchema = new MONGOOSE.Schema({
    userId :{
        type: String,
      },
    firstName: {
    type: String,
    unique: true,
  },
  lastName: {
    type: String,
  }
});
module.exports = MONGOOSE.model("sliatedresu", userDetailsSchema); 


