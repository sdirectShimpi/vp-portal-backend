/**
 *
 *
 *
 */

const userServices = require("../services/user-services");
const { statusCode, message } = require("../utilites/message");
const { successAction, faildAction } = require("../utilites/response");

const AddUser = async (req, res) => {
  let result;
  try {
    result = await userServices.addUser(req.body);
    if (result == "userAllReadyExist") {
      return res
        .status(statusCode.notallowed)
        .json(faildAction(statusCode.notallowed, result, message.dataExist));
    }
    return res
      .status(statusCode.create)
      .json(successAction(result, message.dataAdded));
  } catch (error) {
    console.log(error);

    return res
      .status(statusCode.serverError)
      .json(faildAction(statusCode.serverError, result, error.mesage));
  }
};

const changePassword = async (req, res) => {
  let result;
  try {
    result = await userServices.ChangePassword(req.body);
    if (result === "InvalidEmailPassword") {
      return res
        .status(statusCode.unauthorized)
        .json(
          faildAction(
            statusCode.unauthorized,
            result,
            message.invalidCredentials
          )
        );
    } else {
      return res
        .status(statusCode.success)
        .json(successAction(result, message.changePassword));
    }
  } catch (error) {
    console.log(error);

    return res
      .status(statusCode.serverError)
      .json(faildAction(statusCode.serverError, result, error.mesage));
  }
};

const LoginUser = async (req, res) => {
  let result;
  try {
    result = await userServices.loginUserWithUsernameAndPassword(req.body);
    if (result === "invalidCredentials") {
      return res
        .status(statusCode.unauthorized)
        .json(
          faildAction(
            statusCode.unauthorized,
            result,
            message.invalidCredentials
          )
        );
    } else {
      return res
        .status(statusCode.success)
        .json(successAction(result, message.loging));
    }
  } catch (error) {
    console.log(error);

    return res
      .status(statusCode.serverError)
      .json(faildAction(statusCode.serverError, result, error.mesage));
  }
};

const VerifyOtp = async (req, res) => {
  let result;
  try {
    result = await userServices.verifyOtp(req.body);
    if (result == "userNotFound") {
      return res
        .status(statusCode.notfound)
        .json(faildAction(statusCode.notallowed, result, message.dataNotfound));
    }
    if (result == "InvalidOTP") {
      return res
        .status(statusCode.notfound)
        .json(faildAction(statusCode.notallowed, result, message.InvalidOTP));
    }

    if (result == "otpExpire") {
      return res
        .status(statusCode.unauthorized)
        .json(faildAction(statusCode.notallowed, result, message.otpExpire));
    } else {
      return res
        .status(statusCode.success)
        .json(successAction(result, message.loging));
    }
  } catch (error) {
    console.log(error);

    return res
      .status(statusCode.serverError)
      .json(faildAction(statusCode.serverError, result, error.mesage));
  }
};

const UpdateUser = async (req, res) => {
  let result;
  try {
    result = await userServices.updateUser(req.params.id, req.body, req);
    // result = await userServices.updaeteUser(req.user.userId, req.body, req);
    if (result === "noDataExist") {
      return res
        .status(statusCode.notfound)
        .json(failAction(statusCode.notfound, result, message.dataNotfound));
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

const GetUserRecord = async (req, res) => {
  let result;
  try {
    result = await userServices.getUserRecord(req.body);
    if (result === "noDataExist") {
      return res
        .status(statusCode.notfound)
        .json(faildAction(statusCode.notfound, result, message.dataNotfound));
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

const GetRecordDetails = async (req, res) => {
  let result;
  try {
    result = await userServices.getUserDetails(req.params.id);

    if (result === "datanotExist") {
      return res
        .status(statusCode.notfound)
        .json(faildAction(statusCode.notfound, result, message.dataNotfound));
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
const DeleteUserDetials = async (req, res) => {
  let result;

  try {
    result = await userServices.deleteUser(req.params.id);
    if (result == "noDataExist")
      return res
        .status(statusCode.notfound)
        .json(faildAction(statusCode.notfound, result, message.dataNotfound));
    else {
      return res
        .status(statusCode.success)
        .json(successAction(result, message.deleteData));
    }
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.serverError)
      .json(faildAction(statusCode.serverError, result, error.message));
  }
};

const searchUser = async (req, res) => {
  let result;
  try {
    result = await userServices.search(rq.query);

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

const ResetPassword = async (req, res) => {
  let result;

  try {
    result = await userServices.resetPassword(req.body);
    if (result == "noDataExist")
      return res
        .status(statusCode.notfound)
        .json(faildAction(statusCode.notfound, result, message.dataNotfound));
    else {
      return res
        .status(statusCode.success)
        .json(successAction(result, message.ResetPassword));
    }
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.serverError)
      .json(faildAction(statusCode.serverError, result, error.message));
  }
};






const ContentSend = async (req, res) => {
  let result;

  try {
    result = await userServices.contentSend(req.body);

    return res
      .status(statusCode.success)
      .json(successAction(result, message.ResetPassword));
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.serverError)
      .json(faildAction(statusCode.serverError, result, error.message));
  }
};









module.exports = {
  AddUser,
  LoginUser,
  UpdateUser,
  GetUserRecord,
  GetRecordDetails,
  DeleteUserDetials,
  VerifyOtp,
  changePassword,
  searchUser,
  ResetPassword,
  ContentSend,
};
