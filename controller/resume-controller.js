// const resumeSercives = require('../services/resuma-services')
// const message = require('../utilites/message')
// const { successAction, faildAction } = require("../utilites/response");


//   const addResume = async (req, res) => {
//     let result;
//     try {
//         result = await resumeSercives.AddResume(req.body);
//         return res
//         .status(statusCode.create)
//         .json(successAction(result, message.resume));
//     } catch (error) {
      
//         return res
//         .status(statusCode.serverError)
//         .json(faildAction(statusCode.serverError, result, error.mesage));
//     }
// };


// module.export = {addResume}



const resumeServices = require('../services/resume-services');
const { statusCode, message } = require("../utilites/message");
const { successAction, faildAction } = require("../utilites/response");


const AddResume = async (req, res) => {
    // console.log("res",req)
    // return
    let result;
    try {
        result = await resumeServices.addResume(req.body, req);
      
        return res
            .status(statusCode.success)
            .json(successAction(result, message.resume));
    } catch (error) {
        return res
            .status(statusCode.serverError)
            .json(faildAction(statusCode.serverError, result, error.message));
    }
};


const GetResume = async (req, res) => {
    let result;
    try {
        result = await resumeServices.getResume(req.body);
        console.log("data",result)
        if(result === 'noDataExist') {
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("resume ")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.dataFetched));
        }
    } catch (error) {
        logger.error("Error @ ", error);
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
};




const GetResumeRrcord = async (req, res) => {
    let result;
    try {
        result = await resumeServices.getAllUserRecord(req.body);
        console.log("data",result)
        if(result === 'noDataExist') {
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("resume ")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.dataFetched));
        }
    } catch (error) {
        logger.error("Error @ ", error);
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
};



const GetResumeDetails = async (req, res) => {
  let result;
  try {
      result = await resumeServices.getResumeDetails(req.params.id);
      if(result === 'noDataExist') {
          return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("resume ")));
      } else {
          return res.status(statusCode.success).json(successAction(result, message.getData));
      }
  } catch (error) {

      return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
  }
};
const DeleteResume = async (req, res) => {
  let result;
  try {
      result = await resumeServices.deleteResume(req.params.id);
      if(result === 'noDataExist') {
          return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("resume ")));
      } else {
          return res.status(statusCode.success).json(successAction(result, message.getData));
      }
  } catch (error) {
 console.log(error)
      return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
  }
};







const UpdateResume = async (req, res) => {
    let result;
    try{
      result = await resumeServices.updateResuma(req.params.id,req.body, req);
      // result = await userServices.updaeteUser(req.user.userId, req.body, req);
      if(result ==='noDataExist') {
        return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("resume ")))
      }
      else {
        return res.status(statusCode.success).json(successAction(result, message.updateUser));
      }
    
  
    } catch (error) {
      console.log(error)
      return res
          .status(statusCode.serverError)
          .json(faildAction(statusCode.serverError, result, error.mesage));
    }
  }



  

module.exports = {GetResumeRrcord, AddResume,UpdateResume,GetResume,GetResumeDetails,DeleteResume };
