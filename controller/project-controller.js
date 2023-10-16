const projectServices = require("../services/project-services");
const { statusCode, message } = require("../utilites/message");
const { successAction, faildAction } = require("../utilites/response");

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

module.exports = {
  getUserData,
  GetRecordById,
  AddprojectData,
  GetProductData,
  GetProjectDetails,
  DeleateRecord,
  UptadteData,
};
