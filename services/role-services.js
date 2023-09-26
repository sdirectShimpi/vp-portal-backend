
const Roles =  require ('../model/role-plan-collection')



exports.AddRole = async (payload) => {
    const data = new Roles(payload);
    return data.save();
};



exports.GetRoles = async (payload) => {
    let result;
    const data = await Roles.find({isDeleted: false});
    if(!data) {
        return 'noDataExist';
    } else {
        result = data;
    }
    return result;
};



exports.GetRoleDetails = async (id) => {
    const roleData = await Roles.findOne({_id: id, isDeleted: false});
    if(!roleData){
        return 'noDataExist';
    } else {
        return roleData;
    }
};



exports.UpdateRole = async (id, payload) => {
    let result;
    const roleData = await Roles.findOne({_id: id, isDeleted: false});
    if(!roleData){
        return 'noDataExist';
    } else {
        const updatedData = await Roles.findOneAndUpdate({_id: id}, payload, {new : true});
        result = updatedData;
    }
    return result;
};





exports.DeleteRole = async (id) => {
    const roleData = await Roles.findOne({_id: id, isDeleted: false});
    if(!roleData) {
        return 'noDataExist';
    } else {
        const deleteRoleData = await Roles.findByIdAndUpdate({_id: id}, {$set:{ isDeleted: true}}, {new: true});
        return deleteRoleData;
    }
};


