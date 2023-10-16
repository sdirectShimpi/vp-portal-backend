const mongoose = require ('mongoose')
const room = new mongoose.Schema({
    participants: 
    [
      {
        
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", 
      }
    ],
  time: {
    type: String,
    default: null,
  },
lastMessage:[
  {
    type: mongoose.Schema.Types.ObjectId,
    ref:"chat",
  }
],
isDeleted: {
  type: Boolean,
  default: false,
},
},
{ timestamps: true },

);


module.exports = room;
