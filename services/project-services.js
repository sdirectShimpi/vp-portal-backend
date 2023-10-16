const project = require("../model/project-collection");
const mongoose = require("mongoose");
const user = require("../model/user-collection");
const projectPlan = require("../model/project- plan-collecton");
const { fileUpload } = require("../utilites/universal");

exports.addProjectData = async (payload, req) => {
  try {
   
    const projectData = new project(payload);
    const newProject = await projectData.save();

    let record = {};

    if (req.files) {
      const fileData = await fileUpload(req.files.projectDocument, "doc");

      if (fileData === "invalidFileType" || fileData === "maxFileSize") {
        return fileData;
      }

      record.projectDocument = fileData;
    }
    record.projectId = newProject._id;
    const projectPlanData = new projectPlan(record);
    const savedProjectPlanData = await projectPlanData.save();

    return newProject;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



// exports.addProjectData = async (payload) => {

//      const projectData = new project(payload);
//     let newData = await projectData.save();
//     return newData
// }

// exports.addProjectData = async (payload, record,  req) => {
//   try {
//     const projectData = new project(payload);
//     let newData = await projectData.save();

// if(newData){

//     if (req.files) {
//       const fileData = await fileUpload(req.files.projectDocument, "doc");

//       if (fileData === "invalidFileType" || fileData === "maxFileSize") {
//         return fileData;
//       }

//       record.projectDocument = fileData;
//     }

//   }
//    const Data = {projectId:newData_id}
//    const projectPlanData = new projectPlan(record);
//   const savedProjectPlanData = await projectPlanData.save();
//   return savedProjectPlanData;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// exports.addProjectData = async (payload) => {
//   const addData = await new project(payload);
//   const   projectData = addData
// if (req.files.doc) {

//   const fileData = await fileUpload(req.files.doc, "doc");
//     if (fileData) {
//     if (fileData == "invalidFileType" || fileData == "maxFileSize") {
//       result = fileData;
//     } else {

//       payload.projectData = fileData;
//     }
//   }
//   const addData = await new projectPlan(payload)
//   return addData.save()

// }

//   return projectData.save();
// };

exports.getData = async (payload) => {
  try {
    const page = Number(payload.page);
    const limit = Number(payload.limit);
    const skip = (page - 1) * limit;
    console.log("skip", skip);

    const dataPipeline = [
      { $match: { isDeleted: false } },
      { $skip: skip },
      { $limit: limit },
    ];

    const data = await project.aggregate(dataPipeline);

    const countPipeline = [
      { $match: { isDeleted: false } },
      { $count: "count" },
    ];

    const countData = await project.aggregate(countPipeline);
    console.log("counr", countData);

    if (!data) {
      return "noDataExist";
    } else {
      return { data, count: countData[0] ? countData[0].count : 0 };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// exports.getData = async (payload) => {
//   try {
//    const page = Number(payload.page)
//     const limit =  2
//     const skip = (page - 1) * limit;
//     console.log("skip",skip)

//     const data = await user.aggregate([
//      { $match: { isDeleted: false } },
//      { $skip: skip },
//       { $limit: limit },

//     ]);
//     if (!data) {
//       return "noDataExist";
//     } else {
//       return data;
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// exports.getRecordUsingId = async (_id) => {
//   try {
//     console.log("id", _id);
//     const getData = await project.find({
//       $or: [{ po: _id }, { scrumMaster: _id }, { team: { $in: [_id] } }],
//       isDeleted: false,
//     });

//     const data = await project.aggregate([
//       { $match: { team: new mongoose.Types.ObjectId(_id) } },

//       {
//         $lookup: {
//           from: "users",
//           localField: "team",
//           foreignField: "_id",
//           as: "user",
//         },
//       },
//       { $unwind: "$user" },
//     ]);

//     const poData = await project.aggregate([
//       { $match: { po: new mongoose.Types.ObjectId(_id) } },

//       {
//         $lookup: {
//           from: "users",
//           localField: "po",
//           foreignField: "_id",
//           as: "po",
//         },
//       },
//       { $unwind: "$po" },
//     ]);

//     const scrumMaster = await project.aggregate([
//       { $match: { po: new mongoose.Types.ObjectId(_id) } },

//       {
//         $lookup: {
//           from: "users",
//           localField: "scrumMaster",
//           foreignField: "_id",
//           as: "scrumMaster",
//         },
//       },
//       { $unwind: "$scrumMaster" },
//     ]);

//     if (data.length === 0) {
//       return { message: "No data exists" };
//     }

//     return { data, getData, poData, scrumMaster };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

exports.getRecordUsingId = async (payload) => {
  try {
    const id = payload.id;
    console.log("id", id);
    const page = Number(payload.page || 1);
    const limit = Number(payload.limit || 2);
    const skip = (page - 1) * limit;
    console.log("skip", skip);

    const countPipeline = [
      { $match: { isDeleted: false } },
      { $count: "count" },
    ];
    const countData = await user.aggregate(countPipeline);
    const data = await project.aggregate([
      {
        $match: {
          isDeleted: false,
          $or: [
            { po: new mongoose.Types.ObjectId(id) },
            { scrumMaster: new mongoose.Types.ObjectId(id) },
            { team: { $in: [new mongoose.Types.ObjectId(id)] } },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "team",
          foreignField: "_id",
          as: "userteam",
        },
      },

      { $unwind: "$userteam" },
      {
        $lookup: {
          from: "users",
          localField: "po",
          foreignField: "_id",
          as: "userspo",
        },
      },
      { $unwind: "$userspo" },
      {
        $lookup: {
          from: "users",
          localField: "scrumMaster",
          foreignField: "_id",
          as: "scrumMaster",
        },
      },
      { $unwind: "$scrumMaster" },

      { $skip: skip },
      { $limit: limit },
    ]);

    if (data.length === 0) {
      return { message: "No data exists" };
    }

    return { data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.upadatData = async (id, payload) => {
  const findData = await project.findOne({ _id: id, isDeleted: false });
  if (!findData) {
    return "noDataExist";
  } else {
    const upData = await project.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return upData;
  }
};

exports.deleteData = async (id) => {
  const findData = await project.findOne({ _id: id, isDeleted: false });
  if (!findData) {
    return "noDataExist";
  } else {
    const deleteData = await project.findByIdAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } },
      { new: true }
    );
    return deleteData;
  }
};
