
const RoleService = require("../services/role-services");
const { message, statusCode } = require("../utilites/message");
const { faildAction,successAction } = require("../utilites/response");

 const addRole = async (req, res) => {
    let result;
    try {
        result = await RoleService.AddRole(req.body);
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

const getRoles = async (req, res) => {
    let result;
    try {
        result = await RoleService.GetRoles(req.query);
        if(result === 'noDataExist') {
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.dataNotFound("Role")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.getData));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
};

 const getRoleDetails = async (req, res) => {
    let result;
    try {
        result = await RoleService.GetRoleDetails(req.params.id); 
        if(result === 'noDataExist'){
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.dataNotFound("Role")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.getData));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
};

const updateRole = async (req, res) => {
    let result;
    try {
        result = await RoleService.UpdateRole(req.params.id, req.body);
        if (result === 'noDataExist'){
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("Role")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.dataUpdated(("Role"))));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
};

 const deleteRole = async (req, res) => {
    let result;
    try {
        result = await RoleService.DeleteRole(req.params.id);
        if (result === 'noDataExist') {
            return res.status(statusCode.notfound).json(faildAction(statusCode.notfound, result, message.recordNotFound("Role")));
        } else {
            return res.status(statusCode.success).json(successAction(result, message.dataDeleted("Role")));
        }
    } catch (error) {
   console.log("error",error)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, result, error.message));
    }
}


module.exports = { addRole,getRoles,getRoleDetails,updateRole,deleteRole};
