const projectServices = require('../services/project-services')
const { statusCode, message } = require('../utilites/message')
const { successAction, faildAction } = require('../utilites/response')


const  AddprojectData = async(req, res) => {
    let result 
    result = await  projectServices.addProjectData(req.body)
    try {

        return  res.status(statusCode.success).json(successAction(result, message.projectdataAdded))
        
    } catch (error) {
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message))
        
    }
}


const GetProductData = async(req,res) =>{
    let result
    result  = await projectServices.getData(req.body)
    try
    {
        if(result ==noDataExist )
        {
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound ,result ,message.dataNotfound))
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


const GetProjectDetails = async (req, res) => {
    let result;
    try {
        console.log("hello")
        result = await projectServices.getDataById(req.params.id);
        if(result === 'noDataExist') {
            console.log("ghujjlh")
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.dataNotFound));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.getData));
        }
    } catch (error) {
        console.log("ygjkhgljuh;")
     
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
  };


  const  DeleateRecord= async (req, res) => {
    let result;
    try {
        result = await  projectServices.deleteData(req.params.id);
        if(result === 'noDataExist') {
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.dataNotFound));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.getData));
        }
    } catch (error) {
     console.log(error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
  };



  const UptadteData = async (req, res) => {
    let result;
    try{
      result = await projectServices.upadatData(req.params.id,req.body);
      
      if(result ==='noDataExist') {
        return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.dataNotfound))
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



module.exports = {AddprojectData,GetProductData,GetProjectDetails,DeleateRecord,UptadteData}