
const LeaveService = require("../services/leave-services");
const { message, statusCode } = require("../utilites/message");
const { faildAction,successAction } = require("../utilites/response");

 const addLeave = async (req, res) => {
    let result;
    try {
        result = await LeaveService.AddLeave(req.body);
        return res
        .status(statusCode.create)
        .json(successAction(result, message.dataAdded));
    } catch (error) {
   console.log("error",error)
       
    return res
    .status(statusCode.serverError)
    .json(faildAction(statusCode.serverError, result, error.mesage));
    }
};

const getLeaves = async (req, res) => {
    let result;
    try {
        result = await LeaveService.GetLeaves(req.query);
        if(result === 'noDataExist') {
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.dataNotFound("Leave")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.getData));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
};

 const getLeaveDetails = async (req, res) => {
    let result;
    try {
        result = await LeaveService.GetLeaveDetails(req.params.id); 
        if(result === 'noDataExist'){
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("Leave")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.getData));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
};

const updateLeave = async (req, res) => {
    let result;
    try {
        result = await LeaveService.UpdateLeave(req.params.id, req.body);
        if (result === 'noDataExist'){
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("Leave")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.dataUpdated(("Leave"))));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
};

 const deleteLeave = async (req, res) => {
    let result;
    try {
        result = await LeaveService.DeleteLeave(req.params.id);
        if (result === 'noDataExist') {
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("Leave")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.dataDeleted("Leave")));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
}


module.exports = { addLeave,getLeaves,getLeaveDetails,updateLeave,deleteLeave};
