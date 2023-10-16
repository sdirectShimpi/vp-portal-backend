const mongoose = require ('mongoose')
const chat = new mongoose.Schema({
  sender: 
  { type: String, default: null },
  reciver: {
    type: String,
    default: null,
  },
  message: { type: String, default: null },
  date: {
    type: String,
    default: null,
  },
  time: {
    type: String,
    default: null,
  },
});
module.exports = chat;