const myTask = require('../model/Task-management')
const mongoose = require('mongoose');



exports.AddmyTask= async (payload) => {
    console.log("payolad",payload)
    const data = new myTask(payload);
    return data.save();
};




  


// exports.GetmyTask = async (id) => {
//     try {
//         console.log("huiij")
//       const data = await myTask.find({  isDeleted: false });
//       console.log("data", data);
//       return data; // Return the data, not just "return"
//     } catch (error) {
//       console.error('Error in GetmyTask:', error);
//       throw error; // Rethrow the error for higher-level handling
//     }
//   };
  






exports.GetmyTask = async (id) => {
    try {
        // console.log("huiij", id)
        // return;
      const data = await myTask.find({ taskOf: new mongoose.Types.ObjectId(id), isDeleted: false });
      console.log("data", data);
      return data; 
    } catch (error) {
      console.error('Error in GetmyTask:', error);
      throw error; 
    }
  };
  

exports.GetRoleDetails = async (id) => {
    const roleData = await myTask.findOne({_id: id, isDeleted: false});
    if(!roleData){
        return 'noDataExist';
    } else {
        return roleData;
    }
};



exports.UpdatemyTask= async (id, payload) => {
    let result;
    const roleData = await myTask.findOne({_id: id, isDeleted: false});
    if(!roleData){
        return 'noDataExist';
    } else {
        const updatedData = await myTask.findOneAndUpdate({_id: id}, payload, {new : true});
        result = updatedData;
    }
    return result;
};





exports.DeletemyTask= async (id) => {
    const roleData = await myTask.findOne({_id: id, isDeleted: false});
    if(!roleData) {
        return 'noDataExist';
    } else {
        const deleteRoleData = await myTask.findByIdAndUpdate({_id: id}, {$set:{ isDeleted: true}}, {new: true});
        return deleteRoleData;
    }
};


