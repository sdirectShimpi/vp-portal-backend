const taskService = require ("../services/Task.service")
const { message, statusCode } = require("../utilites/message");
const { faildAction,successAction } = require("../utilites/response");

 const addmyTask = async (req, res) => {
    let result;
    try {
        result = await taskService.AddmyTask(req.body);
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

const getmyTasks = async (req, res) => {
    console.log("res",res)

    
    let result;
    try {
      
        result = await taskService.GetmyTask(req.body);
        if(result === 'noDataExist') {
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.dataNotFound("myTask")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.getData));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
};

 const getmyTaskDetails = async (req, res) => {
    let result;
    try {
        result = await taskService.GetmyTaskDetails(req.params.id); 
        if(result === 'noDataExist'){
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.dataNotFound("myTask")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.getData));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
};

const updatemyTask = async (req, res) => {
    let result;
    try {
        result = await taskService.UpdatemyTask(req.params.id, req.body);
        if (result === 'noDataExist'){
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("myTask")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.dataUpdated(("myTask"))));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
};

 const deletemyTask = async (req, res) => {
    let result;
    try {
        result = await taskService.DeletemyTask(req.params.id);
        if (result === 'noDataExist') {
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("myTask")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.dataDeleted("myTask")));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
}


module.exports = { addmyTask,getmyTasks,getmyTaskDetails,updatemyTask,deletemyTask};
