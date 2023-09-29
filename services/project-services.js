const project = require('../model/project-collection')
const mongoose = require('mongoose')


exports.addProjectData = async(payload) =>{
    const addData = await new project(payload)
    return addData.save()

}
 exports.getData = async(payload)=>{
    const getData = await  project.find({isDeleted:false})
    if(!getData)
    {
        return "noDataExist"
    }
    else{
          return  getData

    }

 }
//  exports.getDataById = async (id) =>{
//     const   getData = await project.findOne({_id:id, isDeleted:false})
//     if(!getData)
//     {
//         return "noDataExist"
//     }
//     else
//     {
//         const userRecords = await Project.aggregate([
//             {
//               $lookup: {
//                 from: "user",
//                 localField: "userDetails",
//                 foreignField: "_id",
//                 as: "user",
//               },
//             },
//              { $unwind: "$user" },
//           ]);

        
//         return {getData,userRecords}
//     }
//  }


// exports.getDataById = async (id) => {
//     // const getData = await project.findOne({ _id: id, isDeleted: false });
//     // if (!getData) {
//     //   return "noDataExist";
//     // }
  
//     const getData = await project.aggregate([
//      {$match : {userDetails : new mongoose.Types.ObjectId(id)}},
//       {
//         $lookup: {
//           from: "users",
//           localField: "userDetails",
//           foreignField: "_id",
//           as: "user",
//         },
//       },
//       { $unwind: "$user" },
//     ]);
  
//     return { getData, userRecords };
//   };






exports.getDataById = async (id) => {
    console.log("id",id)
    // const id = userLogin._id;

    const data = await project.aggregate([
        // { $match: { _id: new mongoose.Types.ObjectId(id) } },
       
         { $match: { userDetails: new mongoose.Types.ObjectId(id) } },
        
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

    if (data.length === 0) {
        return { message: "No data exists" };
    }

    return { data };
};









exports.upadatData = async(id ,payload) =>{
    const  findData = await project.findOne({_id:id, isDeleted:false})
    if(!findData)
    {
        return "noDataExist"
    }
    else{
        const upData = await project.findByIdAndUpdate({_id:id},payload,{new:true})
        return  upData

    }

 }

 exports.deleteData = async(id)=>{
    const findData = await project.findOne({_id:id, isDeleted:false})
    if(!findData)
    {
        return "noDataExist"
    }
    else{
        const deleteData = await project.findByIdAndUpdate({_id:id},{$set:{isDeleted:true}},{new:true})
        return deleteData
    }
 }