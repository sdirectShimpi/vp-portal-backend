/**
 *
 *
 */
const user = require("../model/user-collection");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const role = require("../model/role-plan-collection");

const fs = require("fs");
const { fileUpload, generateToken } = require("../utilites/universal");

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
    console.log("addData,", addData);
    return addData.save();
  }
};

exports.ChangePassword = async (payload, newPassword) => {
  try {
    const checkUser = await user.findOne({ email: payload.email });
    console.log("cheeckUser", checkUser);
    const isPasswordValid = Bcrypt.compareSync(
      payload.password,
      checkUser.password
    );
    console.log("isPasswordValid", isPasswordValid);
    if (!isPasswordValid) {
      return "Invalid Email or Password";
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
  console.log("otp expiry time ", otpExpiry);
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
    const { email, password } = payload;
    const userLogin = await user.findOne({ email });

    if (!userLogin) {
      return "invalidCredentials";
    }
    const isPasswordValid = await Bcrypt.compare(password, userLogin.password);

    if (!isPasswordValid) {
      return "invalidCredentials";
    }

    const userRecords = await user.aggregate([
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
    console.log("newPasswordObject", newPasswordObject);
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
    console.log("resetPassword", resetPassword);
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
  console.log("payload", payload.otp);

  try {
    const userData = await user.findOne({
      email: payload.email,
      isDeleted: false,
    });
    console.log("expiry time from databse", userData.otpExpiry);
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
    }
    let updatedData = await user.findByIdAndUpdate(
      { _id: id, isDeleted: false },
      payload,
      { new: true }
    );
    return updatedData;
  }
};




exports.getUserRecord = async (payload) => {
  let result;
  const data = await user.find({ isDeleted: false });

  if (!data) {
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
