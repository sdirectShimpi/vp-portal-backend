const room = require("../model/Room-Collection");
const moment = require("moment"); 


exports.sendChat = async (payload) => {
  console.log("payload", payload)
  const { sender, receiver, message } = payload;
  const currentDate = moment().format("YYYY-MM-DD");
  const currentTime = moment().format("HH:mm:ss");

  const data = new room({
    sender,
    receiver,
    message,
    date: currentDate,
    time: currentTime,
  });

  await data.save();

  return data;
};

// exports.sendChat= async (payload) => {
//   console.log("payolad",payload)
//   const data = new room(payload);
//   io.emit('message',newchat)
//   return data.save();

// };



exports.reciveChat = async (payload) => {
  try {
    const data = await room.find({ isDeleted: false });

    if (!data) {
      return "noDataExist";
    }

    return data;
  } catch (error) {
   
    console.error("Error fetching chat messages:", error);
    throw error; 
  }
};


// exports.reciveChat = async (payload) => {
//   let result;
//   const data = await room.find({ isDeleted: false });
//   if (!data) {
//     return "noDataExist";
//   } else {
//     result = data;
//   }
//   return result;
// };
