/**
 *
 *
 */

const user = require("../model/user-collection");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const role = require("../model/role-plan-collection");
const mongoose = require("mongoose");
const leave = require("../model/Leave-mangement-collection");
const { addResume } = require("../services/resume-services");

const fs = require("fs");
const { fileUpload, generateToken } = require("../utilites/universal");
const { constants } = require("fs/promises");

exports.addUser = async (payload) => {
  const checkUser = await user.findOne({
    email: payload.email,
    isDeleted: false,
  });
  if (checkUser) {
    return "userAlreadyExists";
  } else {
    const salt = Bcrypt.genSaltSync(12);
    payload.password = Bcrypt.hashSync(payload.password, salt);

    const addData = new user(payload);
    let savedData = await addData.save();
    const userRole = savedData.userType;
    const roleId = await role.findOne(
      { userType: userRole, isDeleted: false },
      { _id: 1 }
    );

    if (roleId) {
      let payload = {
        roleType: roleId._id,
      };

      const updatedData = await user.findByIdAndUpdate(
        { _id: savedData._id },
        { $set: { roleType: payload.roleType } },
        { new: true }
      );
      //mail
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "shimpiraj29@gmail.com",
          pass: "xluo ipcq xinr yeis",
        },
      });

      let typeUser;
      if (payload.userType === 2) {
        typeUser = "Operator";
      }
      if (payload.userType === 3) {
        typeUser = "PO";
      }
      if (payload.userType === 4) {
        typeUser = "SM";
      }
      if (payload.userType === 5) {
        typeUser = "Employee";
      }

      const mailOptions = {
        from: "shimpiraj84094@gmail.com",
        to: addData.email,
        subject: "smartData VP-portal",
        text: `Hello, user you have been successfully registered as an ${typeUser} on smartData VP-portal, your login creds are : username- ${addData.email}, password- ${addData.password}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
      savedData = updatedData;
    }

    return savedData;
  }
};







exports.GetUserType = async () => {
  try {
    const data = await user.find({
      $or: [{ userType: 3 }, { userType: 4 }, { userType: 5 }],
      isDeleted: false,
    });
   

    if (!data || data.length === 0) {
      return "noDataExit";
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// exports.GetUserType = async () =>{
//   let result;
//   const  data = await user.find({
//     $or:[
//       {userType:3},
//       {userType:2},
//       {userType:5}
//     ],
//     isDeleted: false
//   });
//   if(!data)
//   {
//     return 'noDataEaxit'
//   }
//   else
//   {
//   result = data;
//   }
//    return result

// }

    // const checkUser = await user.findOne({
    //   $and: [{ _id: payload._id }, { password: payload.password }],
    // });

    // if (!checkUser) {
    //   return "Invalid Id or Password";
    // }

exports.ChangePassword = async (payload, newPassword) => {

  try {
    const checkUser = await user.findOne({ id: payload._id });


    const isPasswordValid = await Bcrypt.compare(
      payload.password,
      checkUser.password
    );
    
    if (!isPasswordValid) {
      return "Invalid id or Password";
    }

    if (checkUser) {
      const salt = Bcrypt.genSaltSync(10);
      const hashPassword = Bcrypt.hashSync(payload.newPassword, salt);

      checkUser.password = hashPassword;
      await checkUser.save();
      return "Password changed successfully!";
    }
    return "InvalidEmailPassword";

    // const token = jwt.sign({ user }, "secretkey");
  } catch (error) {
    console.error("Error while changing password:", error);
  }
};






const generateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const currentTime = new Date();
  const otpExpiry = new Date(currentTime.getTime() + 30000);
 
  return {
    otp: otp,
    otpExpiry: otpExpiry,
  };
};
// const generateNewPassword =()=>{

//   const generatpassword = Math.floor(1000 + Math.random() * 9000).toString();
//   return{
//     generatpassword:generatpassword
//   }

// }

exports.loginUserWithUsernameAndPassword = async (payload) => {
  try {
    const userLogin = await user.findOne({ email: payload.email });

    if (!userLogin) {
      return "invalidCredentials";
    }
    const isPasswordValid = await Bcrypt.compare(
      payload.password,
      userLogin.password
    );

    if (!isPasswordValid) {
      return "invalidCredentials";
    }
   

    const id = userLogin._id;

    const userRecords = await user.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "roles",
          localField: "roleType",
          foreignField: "_id",
          as: "role",
        },
      },
      { $unwind: "$role" },
    ]);

    const loginToken = await generateToken({
      when: new Date(),
      userId: userLogin._id,
    });
    if (!loginToken) {
      return "token not generateToken";
    } else {
      return { loginToken, userRecords };
    }
  } catch (error) {
    throw error;
  }
};

// exports.loginUserWithOTP = async (payload) => {
//   try {
//     const otp = generateOTP().otp;
//     const otpExpiry = generateOTP().otpExpiry;
//     const userLogin = await user.findOneAndUpdate(
//       {
//         $or: [{ email: payload.userName }, { mobileNumber: payload.userName }],
//         isDeleted: false,
//       },

//       { otp, otpExpiry },

//       { new: true }
//     );

//     if (!userLogin) {
//       return "invalidCredentials";
//     }

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "shimpiraj84094@gmail.com",
//         pass: "qmzygsiadpfgfzhb",
//       },
//     });

//     const mailOptions = {
//       from: "shimpiraj84094@gmail.com",
//       to: userLogin.email,
//       subject: "Your OTP Code",
//       text: `Your OTP code is: ${otp}`,
//     };

//     const loginToken = await generateToken({
//       when: new Date(),
//       userId: userLogin._id,
//     });
//     console.log("loginToken", loginToken);

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Error sending OTP email:", error);
//       } else {
//         console.log("OTP email sent:", info.response);
//       }
//     });

//     return "OTP sent via email";
//   } catch (error) {
//     throw error;
//   }
// };

const generateNewPassword = () => {
  const generatpassword = Math.floor(1000 + Math.random() * 9000).toString();
  return generatpassword;
};

// Password reset

exports.resetPassword = async (payload) => {
  try {
    const newPasswordObject = generateNewPassword();
   
    const salt = Bcrypt.genSaltSync(12);
    const hashedPassword = Bcrypt.hashSync(newPasswordObject, salt);

    const resetPassword = await user.findOneAndUpdate(
      {
        email: payload.email,
        isDeleted: false,
      },

      { password: hashedPassword },
      { new: true }
    );
       if (!resetPassword) {
      return "User not found ";
    }
    await resetPassword.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shimpiraj84094@gmail.com",
        pass: "qmzygsiadpfgfzhb",
      },
    });

    const mailOptions = {
      from: "shimpiraj84094@gmail.com",
      to: resetPassword.email,
      subject: "Password Reset",
      text: `Your new password is: ${newPasswordObject}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return "Password reset email sent";
  } catch (error) {
    throw error;
  }
};

exports.contentSend = async (payload, _id) => {
 
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shimpiraj84094@gmail.com",
        pass: "qmzygsiadpfgfzhb",
      },
    });
    const htmlContent = Object.keys(payload)[0];

    const mailOptions = {
      from: "shimpiraj84094@gmail.com",
      to: "shimpiraj29@gmail.com",
      subject: "send Content",
      html: htmlContent,
    };
    /** */
    const data = await leave.aggregate([
      { $match: { userDetails: new mongoose.Types.ObjectId(_id) } },
      {
        $lookup: {
          from: "users",
          localField: "userDetails",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ]);
   
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    return "Content email sent";
  } catch (error) {
    throw error;
  }
};

exports.search = async (payload) => {
  try {
    const result = await user.find({
      email: { $regex: new RegExp(payload.email, "i") },
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};
exports.verifyOtp = async (payload) => {
 
  try {
    const userData = await user.findOne({
      email: payload.email,
      isDeleted: false,
    });
    if (!userData) {
      return "userNotFound";
    }
    if (userData.otp !== payload.otp) {
      return "invalidOTP";
    }
    const currentTime = new Date();
    const expiryTime = new Date(userData.otpExpiry);
    if (currentTime > expiryTime) {
      return "otpExpired";
    }
    userData.otp = null;
    userData.otpExpiry = null;
    await userData.save();

    return "otpVerified";
  } catch (error) {
    console.log(error);

    return "error";
  }
};

exports.updateUser = async (id, payload, req) => {


  const checkUserExists = await user.findOne({ _id: id, isDeleted: false });
  if (!checkUserExists) {
    return "noDataExist";
  } else {
    if (req.files) {
      const fileData = await fileUpload(req.files.profileImage, "users");
      if (fileData) {
        if (fileData == "invalidFileType" || fileData == "maxFileSize") {
          result = fileData;
        } else {
          payload.profileImage = fileData;
        }
      }
      const resumeResult = await addResume(id, req);

      // if (req.files.resume) {
      //   const resumePayload = {
      //     userId: checkUserExists._id,
      //     fileData: req.ResumeDoc.data,
      //   };

      // if (
      //   resumeResult === "invalidFileType" ||
      //   resumeResult === "maxFileSize"
      // ) {
      //   result = resumeResult;
      // }
    }

    let updatedData = await user.findByIdAndUpdate(
      { _id: id, isDeleted: false },
      payload,
      { new: true }
    );
    return updatedData;
  }
};

// exports.updateUser = async (id, payload, req) => {
//   const checkUserExists = await user.findOne({ _id: id, isDeleted: false });
//   if (!checkUserExists) {
//     return "noDataExist";
//   } else {
//     if (req.files) {
//       const fileData = await fileUpload(req.files.profileImage, "users");
//       if (fileData) {
//         if (fileData == "invalidFileType" || fileData == "maxFileSize") {
//           result = fileData;
//         } else {
//           payload.profileImage = fileData;
//         }
//       }
//     }
//     let updatedData = await user.findByIdAndUpdate(
//       { _id: id, isDeleted: false },
//       payload,
//       { new: true }
//     );
//     return updatedData;
//   }
// };

exports.getUserRecord = async (payload) => {
  let result;
  const page = Number(payload.page);
  const limit = Number(payload.limit || 2);
  const skip = (page - 1) * limit;
  

  const data = await user.aggregate([
    { $match: { isDeleted: false } },
    { $skip: skip },
    { $limit: limit },
  ]);
  if (data.length === 0) {
    return "noDataExist";
  } else {
    result = data;
  }
  return result;
};

exports.getUserDetails = async (id) => {
  const data = await user.findById({ _id: id, isDeleted: false });
  if (!data) {
    return "noDataExist";
  } else {
    return data;
  }
};

// exports.getUserDetails = async (id) => {
//   const getData = await user.findOne({ _id: id, isDeleted: false });
//   if (!getData) {
//     return "noDataExist";
//   }

//   const productRecords = await user.aggregate([

//     {
//       $lookup: {
//         from: "projects",
//         localField: "projectDetails",
//         foreignField: "_id",
//         as: "projectDetails",
//       },
//     },
//     { $unwind: "$projectDetails" },
//   ]);

//   return { getData, productRecords };
// };

exports.deleteUser = async (id) => {
  const userData = await user.findOne({ _id: id, isDeleted: false });
  if (!userData) {
    return "noDataExist";
  } else {
    const deleteUserData = await user.findByIdAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } },
      { new: true }
    );
    return deleteUserData;
  }
};
