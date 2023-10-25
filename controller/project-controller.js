const projectServices = require("../services/project-services");
const { statusCode, message } = require("../utilites/message");
const { successAction, faildAction } = require("../utilites/response");
const project = require('../model/project-collection')

const AddprojectData = async (req, res) => {
  let result;

  const teams = JSON.parse(req.body.team);
  req.body.team=teams
  result = await projectServices.addProjectData(req.body,req );
  try {
    return res
      .status(statusCode.success)
      .json(successAction(result, message.projectdataAdded));
  } catch (error) {
    return res
      .status(statusCode.serverError)
      .json(faildAction(statusCode.serverError, result, error.message));
  }
};



const getUserData = async (req, res) => {
  let result;
  result = await projectServices.getUserDetails(req.body);
  try {
    return res
      .status(statusCode.success)
      .json(successAction(result, message.getData));
  } catch (error) {
    return res
      .status(statusCode.serverError)
      .json(faildAction(statusCode.serverError, result, error.message));
  }
};

const GetProductData = async (req, res) => {
  let result;
  result = await projectServices.getData(req.query);
 
  try {
    if (result === "noDataExist") {
      return res
        .status(statusCode.notfound)
        .json(faildAction(statusCode.notfound, result, message.dataNotfound));
    } else {
      return res
        .status(statusCode.success)
        .json(faildAction(statusCode.success, result, message.getData));
    }
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.serverError)
      .json(faildAction(statusCode.serverError, result, error.message));
  }
};

const GetRecordById = async (req, res) => {

  let result;
  
  result = await projectServices.getRecordUsingId(req.query);

  try {
    if (result === "noDataExist") {
      return res
        .status(statusCode.notfound)
        .json(faildAction(statusCode.notfound, result, message.dataNotfound));
    } else {
      return res
        .status(statusCode.success)
        .json(faildAction(statusCode.success, result, message.getData));
    }
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.serverError)
      .json(faildAction(statusCode.serverError, result, error.message));
  }
};







const GetProjectDetails = async (req, res) => {
  let result;
  try {

    result = await projectServices.getDataById(req.params.id);
    if (result === "noDataExist") {
    
      return res
        .status(statusCode.notfound)
        .json(faildAction(statusCode.notfound, result, message.dataNotFound));
    } else {
      return res
        .status(statusCode.success)
        .json(successAction(result, message.getData));
    }
  } catch (error) {
   

    return res
      .status(statusCode.serverError)
      .json(faildAction(statusCode.serverError, result, error.message));
  }
};

const DeleateRecord = async (req, res) => {
  
  let result;
  try {
    result = await projectServices.deleteData(req.params.id);
    if (result === "noDataExist") {
      return res
        .status(statusCode.notfound)
        .json(faildAction(statusCode.notfound, result, message.dataNotFound));
    } else {
      return res
        .status(statusCode.success)
        .json(successAction(result, message.getData));
    }
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.serverError)
      .json(faildAction(statusCode.serverError, result, error.message));
  }
};

const UptadteData = async (req, res) => {
  
  let result;
  try {
    result = await projectServices.upadatData(req.params.id, req.body);

    if (result === "noDataExist") {
      return res
        .status(statusCode.notfound)
        .json(faildAction(statusCode.notfound, result, message.dataNotfound));
    } else {
      return res
        .status(statusCode.success)
        .json(successAction(result, message.updateUser));
    }
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.serverError)
      .json(faildAction(statusCode.serverError, result, error.mesage));
  }
};


const updateStatus = async (req, res) => {
  const { isDeleted, _id } = req.body

  try {
      if (isDeleted === "activate") {
          const project = await project.findByIdAndUpdate(_id, { isDeleted: true })
          return res.status(200).json({ success: true, msg: "Project Aviailable", project: project })
      }
      else {
          const project = await project.findByIdAndUpdate(_id, { isDeleted: false })
          return res.status(200).json({ success: true, msg: "Project Deleated", project: project })
      }
  } catch (error) {
      return res.status(500).json({ success: false, msg: "Internal Server Error", error })
  }
}



const searchUser = async (req, res) => {
  let result;
  try {
    result = await projectServices.search(req.query);

    return res
      .status(statusCode.success)
      .json(successAction(result, message.search));
  } catch (error) {
    console.log(error);

    return res
      .status(statusCode.serverError)
      .json(faildAction(statusCode.serverError, result, error.mesage));
  }
};













module.exports = {
  searchUser,
  getUserData,
  GetRecordById,
  AddprojectData,
  GetProductData,
  GetProjectDetails,
  DeleateRecord,
  UptadteData,
  updateStatus
};
