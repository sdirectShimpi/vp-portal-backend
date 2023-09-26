const projectPlan = require('../services/projectPlan-services')
const { statusCode, message } = require('../utilites/message')
const { successAction, faildAction } = require('../utilites/response')


const  AddprojectPlan = async(req,res) => {
    let result 
    result = await  projectPlan.addProjectPlan(req.body,req)
    try {

        return  res.status(statusCode.success).json(successAction(result, message.projectdataAdded))
        
    } catch (error) {
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message))
        
    }
}

const GetProductPlanData = async(req,res) =>{
    let result
    result  = await projectPlan.getProjectPlanData(req.body)
    try
    {
        if(result ==noDataExist )
        {
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound ,result ,message.recordNotFound("ProjectPlan")))
        }
        else
        {
            return res.status(statusCode.success).json(faildAction(statusCode.success,result, message.getData))
        }

    }
    catch(error)
    {
        console.log(error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message))

    }

}
const GetProjectPlanById = async (req, res) => {
    let result;
    try {
        result = await projectPlan.getProjectPlanDataById(req.params.id);
        console.log("result",result)
        if(result === 'noDataExist') {
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("ProjectPlan")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.getData));
        }
    } catch (error) {
     
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
  };


  const  DeleateProjectPlanRecord= async (req, res) => {
    let result;
    try {
        result = await  projectPlan.deleteProjectPlanRecord(req.params.id);
        if(result === 'noDataExist') {
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("projectPlan")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.getData));
        }
    } catch (error) {
     console.log(error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
  };




  const UpadatProjectPlanData = async (req, res) => {
    let result;
    try{
      result = await projectPlan.upadatProjectPlanData(req.params.id,req.body);
      
      if(result ==='noDataExist') {
        return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("projectPlan")))
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







module.exports = {AddprojectPlan,GetProductPlanData,GetProjectPlanById,DeleateProjectPlanRecord,UpadatProjectPlanData}