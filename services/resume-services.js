const resume = require('../model/resume-collection')
const fs = require("fs");
const { fileUpload } = require("../utilites/universal");

exports.addResume = async (  payload, req) => {
   
    if (req.files.resume) {
      
        const fileData = await fileUpload(req.files.resume, "resume");
       
        if (fileData) {
          if (fileData == "invalidFileType" || fileData == "maxFileSize") {
            result = fileData;
          } else {

            payload.ResumeDoc = fileData;
          }
        }
      }
      const data = new resume(payload);
return data.save();
};


exports.getResume = async () => {
    let result;
    
    const data = await resume.find({isDeleted: false});

    if(!data) {
        return 'noDataExist';
    } else {
        result = data;
    }
    console.log("result",result)

    return result;
};


exports.getResumeDetails = async (id) => {
    const data = await resume.findById({_id: id, isDeleted: false});
    if(!data){
        return 'noDataExist';
    } else {
        return data;
    }
};

exports.updateResuma = async (id, payload, req) => {
  const checkResumExists = await resume.findOne({ _id: id, isDeleted: false });
    if (!checkResumExists) {
      return "noDataExist";
    } else {
      if (req.files) {
      
        const fileData = await fileUpload(req.files.resume, "resume");
       
        if (fileData) {
          if (fileData == "invalidFileType" || fileData == "maxFileSize") {
            result = fileData;
          } else {
           
            payload.ResumeDoc = fileData;
          }
        }
      }
       let updatedData = await resume.findByIdAndUpdate(
        { _id: id, isDeleted: false },
        payload,
        { new: true }
      );
      return updatedData;
    }
};
  
  
exports.deleteResume = async (id) => {
  const resumeData = await resume.findOne({ _id: id, isDeleted: false });

  if (!resumeData) {
    return 'noDataExist';
  } else {
    const deleteResumeData = await resume.findByIdAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } },
      { new: true }
    );
    return deleteResumeData;
  }
  };
   


  exports.getAllUserRecord = async () => {
   const resumeRecords = await resume.aggregate([
    {
          $lookup: {
              from: "users",
              localField: "Resumeof",
              foreignField: "_id",
              as: "user"
          }
      },
      {$unwind:"$user"}
      
  ])
  console.log("resumeRecords",resumeRecords)
    return resumeRecords
  
  }
  






  
