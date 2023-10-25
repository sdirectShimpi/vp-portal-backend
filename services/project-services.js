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

// exports.getData = async (payload) => {
//   try {
//     const page = Number(payload.page);
//     const limit = Number(payload.limit);
//     const skip = (page - 1) * limit;

//     const dataPipeline = [
//       // { $match: { isDeleted: false } },
//       { $skip: skip },
//       { $limit: limit },
//     ];

//     const data = await project.aggregate(dataPipeline);

//     const countPipeline = [
//       // { $match: { isDeleted: false } },
//       { $count: "count" },
//     ];

//     const countData = await project.aggregate(countPipeline);

//     if (!data) {
//       return "noDataExist";
//     } else {
//       return { data, count: countData[0] ? countData[0].count : 0 };
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// exports.getData = async (payload) => {
//   try {
//     console.log("payload", payload);
//     const page = Number(payload.page);
//     const limit = Number(payload.limit);
//     const skip = (page - 1) * limit;

//     let queryObject = {};

//     if (payload.projectName) {
//       let searchKeyWord;
//       if (payload.projectName) {
//         searchKeyWord = payload.projectName;
//         queryObject.projectName = {
//           $regex: new RegExp(searchKeyWord, "i"),
//         };
//       } else {
//         //  searchKeyWorddelete
//         delete queryObject.projectName;
//       }
//       // console.log('searchKeyWord',searchKeyWord)
//       // queryObject.projectName = {
//       //   $regex: new RegExp(searchKeyWord, "i"),
//       // };
//     }

//     if (payload.isDeleted !== undefined) {
//       queryObject.isDeleted = payload.isDeleted === "true" ? true : false;
//     }
//     console.log("queryObject", queryObject);
//     const dataPipeline = [
//       { $match: queryObject },
//       { $skip: skip },
//       { $limit: limit },
//     ];

//     const data = await project.aggregate(dataPipeline);

//     const countPipeline = [{ $match: queryObject }, { $count: "count" }];

//     const countData = await project.aggregate(countPipeline);

//     if (!data) {
//       return "noDataExist";
//     } else {
//       return { data, count: countData[0] ? countData[0].count : 0 };
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

exports.getData = async (payload) => {
  try {
    const page = Number(payload.page);
    const limit = Number(payload.limit);
    const skip = (page - 1) * limit;

    let queryObject = {};

    if (payload.projectName && payload.projectName !== "undefined") {
      console.log(payload.projectName, "<<<payload.projectName");
      queryObject.projectName = {
        $regex: new RegExp(payload.projectName, "i"),
      };
    }

    // if (payload.createdAt) {
    //   queryObject.createdAt = {
    //     $sort: payload.createdAt === -1,
    //   };
    // }

    if (payload.isDeleted !== "undefined") {
      if (payload.isDeleted === "all") {
        queryObject.isDeleted = { $in: [true, false] };
      } else if (payload.isDeleted === "true") {
        queryObject.isDeleted = true;
      } else {
        queryObject.isDeleted = false;
      }
    }

    const dataPipeline = [
      { $match: queryObject },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ];
    console.log(dataPipeline, "<<<<>>>>");
    const data = await project.aggregate(dataPipeline);
    console.log(data, "<<<<data>>>>");
    const countPipeline = [{ $match: queryObject }, { $count: "count" }];

    const countData = await project.aggregate(countPipeline);

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
//     console.log("payload", payload);
//     const page = Number(payload.page);
//     const limit = Number(payload.limit);
//     const skip = (page - 1) * limit;

//     let queryObject = {};

//     if (payload.projectName) {
//       // If projectName is defined in the payload, add it to the query object
//       queryObject.projectName = {
//         $regex: new RegExp(payload.projectName, "i"),
//       };
//     }

//     if (payload.isDeleted !== undefined) {
//       queryObject.isDeleted = payload.isDeleted === "true" ? true : false;
//     }

//     console.log("queryObject", queryObject);

//     const dataPipeline = [
//       { $match: queryObject },
//       { $skip: skip },
//       { $limit: limit },
//     ];

//     const data = await project.aggregate(dataPipeline);

//     const countPipeline = [{ $match: queryObject }, { $count: "count" }];

//     const countData = await project.aggregate(countPipeline);

//     if (!data) {
//       return "noDataExist";
//     } else {
//       return { data, count: countData[0] ? countData[0].count : 0 };
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// if (payload.createdAt) {
//   queryObject.createdAt = {
//     $sort: payload.createdAt === "asc" ? 1 : -1,
//   };
// }

exports.search = async (payload) => {
  let queryObject = {};

  try {
    if (payload.projectName) {
      queryObject.projectName = {
        $regex: new RegExp(payload.projectName, "i"),
      };
    }

    if (payload.isDeleted !== undefined) {
      queryObject.isDeleted = payload.isDeleted;
    }

    const result = await project.find(queryObject);

    return result;
  } catch (err) {
    console.log(err);
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

    const page = Number(payload.page || 1);
    const limit = Number(payload.limit || 2);
    const skip = (page - 1) * limit;

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

// exports.search = async (payload) => {
//   try {

//     const result = await project.find({
//       projectName: { $regex: new RegExp(payload.projectName, "i") },
//     });
//     return result;
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.search = async (req, res) => {
//   try {
//     const { product_name } = req.query;
//     console.log('product_name', product_name);

//     // Use Mongoose to find records that match the product_name
//     const result = await ProductRecord.find({
//       product_name: { $regex: new RegExp(product_name, 'i') },
//     });

//     res.json(result);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// };
