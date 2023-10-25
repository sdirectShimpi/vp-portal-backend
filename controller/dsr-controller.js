
const DSRservice =  require ("../services/drs-services")
const { message, statusCode } =  require("../utilites/message");
const { faildAction,successAction } = require("../utilites/response");

 const addDSR = async (req, res) => {
    let result;
    try {
        result = await DSRservice.AdddsrSchema(req.body);
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

const getDSRs = async (req, res) => {
    let result;
    try {
        result = await DSRservice.GetdsrSchema(req.query);
        if(result === 'noDataExist') {
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.dataNotFound("DSR")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.getData));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
};






 const getDSRDetails = async (req, res) => {
    let result;
    try {
        result = await DSRService.GetDSRDetails(req.params.id); 
        if(result === 'noDataExist'){
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.dataNotFound("DSR")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.getData));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
};

const updateDSR = async (req, res) => {
    let result;
    try {
        result = await DSRService.UpdateDSR(req.params.id, req.body);
        if (result === 'noDataExist'){
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("DSR")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.dataUpdated(("DSR"))));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
};

 const deleteDSR = async (req, res) => {
    let result;
    try {
        result = await DSRService.DeleteDSR(req.params.id);
        if (result === 'noDataExist') {
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("DSR")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.dataDeleted("DSR")));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
}


module.exports = { addDSR,getDSRs,getDSRDetails,updateDSR,deleteDSR};
