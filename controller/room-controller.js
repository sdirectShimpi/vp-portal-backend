const  roomService = require ('../services/room-services')
const { statusCode, message } = require("../utilites/message");
const { successAction, faildAction } = require("../utilites/response");


const sendChat = async (req, res) => {
    let result;
    try {
        result = await roomService.sendChat(req.body );
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






const reciveTask = async (req, res) => {  
    let result;
    try {
      
        result = await roomService.reciveChat(req.params);
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
  
  

module.exports = {sendChat , reciveTask}