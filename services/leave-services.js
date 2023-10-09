const leave = require("../model/Leave-mangement-collection");
const mongoose = require("mongoose");

exports.AddLeave = async (payload) => {
  const data = new leave(payload);
  return data.save();
};

exports.GetLeaves = async () => {
  let result;
  const data = await leave.find({ isDeleted: false });
  if (!data) {
    return "noDataExist";
  } else {
    result = data;
  }
  return result;
};

// exports.GetLeaveDetails = async (id) => {
//     console.log("id",id)
//     const LeaveData = await leave.findOne({_id: id, isDeleted: false});
//     if(!LeaveData){
//         return 'noDataExist';
//     } else {
//         return LeaveData;
//     }
// };

// exports.GetLeaveDetails = async (_id) => {
//   console.log("id", _id);

//   const data = await leave.aggregate([
//     //{ $match: { _id: new mongoose.Types.ObjectId(_id) } },

//      { $match: { userDetails: new mongoose.Types.ObjectId(_id) } },

//     {
//       $lookup: {
//         from: "users",
//         localField: "userDetails",
//         foreignField: "_id",
//         as: "user",
//       },
//     },
//     { $unwind: "$user" },
//   ]);

//   if (data.length === 0) {
//     return { message: "No data exists" };
//   }

//   return { data };
// };


exports.GetLeaveDetails = async (_id) => {
  console.log("id", _id);

  const data = await leave.aggregate([
    { $match: { userDetails: new mongoose.Types.ObjectId(_id) } },
    {
      $lookup: {
        from: "users",
        localField: "userDetails",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
  ]);

  console.log("Aggregation Result:", data);

  if (data.length === 0) {
    console.log("No data exists for _id:", _id);
    return { message: "No data exists" };
  }

  return { data };
};

















exports.UpdateLeave = async (id, payload) => {
  let result;
  const LeaveData = await leave.findOne({ _id: id, isDeleted: false });
  if (!LeaveData) {
    return "noDataExist";
  } else {
    const updatedData = await leave.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    result = updatedData;
  }
  return result;
};

exports.DeleteLeave = async (id) => {
  const LeaveData = await leave.findOne({ _id: id, isDeleted: false });
  if (!LeaveData) {
    return "noDataExist";
  } else {
    const deleteLeaveData = await leave.findByIdAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } },
      { new: true }
    );
    return deleteLeaveData;
  }
};
