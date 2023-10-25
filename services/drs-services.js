
const dsrSchema =  require('../model/DSR-collection')



exports.AdddsrSchema = async (payload) => {
    const date = new Date();
     const currentStatus = `you can not fill DSR ${date} `


    const data = new dsrSchema(payload);
    return data.save();
};





exports.GetdsrSchema = async (payload) => {


    let result;
    const data = await dsrSchema.find({isDeleted: false});
    if(!data) {
        return 'noDataExist';
    } else {
        result = data;
    }
    return result;
};








exports.GetdsrSchemaDetails = async (id) => {
    const dsrSchemaData = await dsrSchema.findOne({_id: id, isDeleted: false});
    if(!dsrSchemaData){
        return 'noDataExist';
    } else {
        return dsrSchemaData;
    }
};



exports.UpdatedsrSchema = async (id, payload) => {
    let result;
    const dsrSchemaData = await dsrSchema.findOne({_id: id, isDeleted: false});
    if(!dsrSchemaData){
        return 'noDataExist';
    } else {
        const updatedData = await dsrSchema.findOneAndUpdate({_id: id}, payload, {new : true});
        result = updatedData;
    }
    return result;
};





exports.DeletedsrSchema = async (id) => {
    const dsrSchemaData = await dsrSchema.findOne({_id: id, isDeleted: false});
    if(!dsrSchemaData) {
        return 'noDataExist';
    } else {
        const deletedsrSchemaData = await dsrSchema.findByIdAndUpdate({_id: id}, {$set:{ isDeleted: true}}, {new: true});
        return deletedsrSchemaData;
    }
};
