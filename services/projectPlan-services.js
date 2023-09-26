const projectPlan = require('../model/project- plan-collecton')
const { fileUpload } = require("../utilites/universal");

exports.addProjectPlan = async(payload,req) =>{

    if (req.files.doc) {
      
        const fileData = await fileUpload(req.files.doc, "doc");
       
        if (fileData) {
          if (fileData == "invalidFileType" || fileData == "maxFileSize") {
            result = fileData;
          } else {

            payload.projectDocument = fileData;
          }
        }
      }
const addData = await new projectPlan(payload)
return addData.save()
}

exports.getProjectPlanData = async(payload)=>{
    const getData = await  projectPlan.find({isDeleted:false})
    if(!getData)
    {
        return "noDataExist"
    }
    else{
          return  getData

    }
}

 exports.getProjectPlanDataById = async (id) =>{
    const   getData = await projectPlan.findOne({_id:id, isDeleted:false})
    if(!getData)
    {
        return "noDataExist"
    }
    else
    {
        return getData



    c
    }
 }


 exports.deleteProjectPlanRecord= async(id)=>{
    const findData = await projectPlan.findOne({_id:id, isDeleted:false})
    if(!findData)
    {
        return "noDataExist"
    }
    else{
        const deleteData = await projectPlan.findByIdAndUpdate({_id:id},{$set:{isDeleted:true}},{new:true})
        return deleteData
    }
 }



//  exports.upadatProjectPlanData = async(id ,payload) =>{
//     const  findData = await projectPlan.findOne({_id:id, isDeleted:false})
//     if(!findData)
//     {
//         return "noDataExist"
//     }
//     else{
//         const UpdateData = await projectPlan.findByIdAndUpdate({_id:id},payload,{new:true})
//         return  UpdateData

//     }

//  }



exports.updateProjectPlanData = async (id, payload, req) => {
  const findData = await projectPlan.findOne({ _id: id, isDeleted: false });
  if (!findData) {
    return "noDataExist";
  } else {
   
    if (req.files && req.files.doc) {
      const fileData = await fileUpload(req.files.doc, "doc");

      if (fileData) {
        if (fileData === "invalidFileType" || fileData === "maxFileSize") {
          return fileData; 
        } else {
       
          payload.doc = fileData;
        }
      }
    }
  const updatedData = await projectPlan.findByIdAndUpdate(
      { _id: id },
      payload,
      { new: true }
    );
    return updatedData;
  }
};
