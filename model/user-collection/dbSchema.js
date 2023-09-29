const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
       default: null
    },
    mobile: {
      type: String,
       default: null
    },


    content: {
      type: String,
       default: null
    },


    
    projectDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },


    otp:{
      type:String,
      default: null
    },
    otpExpiry:{
      type:String,
      default: null
},
    status: {
      type: Number,
      default: 1, 
      enum: [0, 1]
  },
    designation: {
      type: String,
       default: null
    },

    userType: {
      type: Number,
      default: 2,
      enum: [1, 2, 3, 4, 5],
    },


    
    password: {
      type: String,
       default: null
    },
    name: {
      type: String,
       default: null
    },
    empCode: {
      type: String,
       default: null
    },
    fatherName: {
      type: String,
       default: null
    },
    dateOfJoining: {
      type: Date,
       default: null
    },
    branch: {
      type: String,
       default: null
    },
    shift: {
      type: String,
       default: null
    },
    type: {
      type: String,
       default: null
    },
    group: {
      type: String,
       default: null
    },
    personalEmail: {
      type: String,
       default: null
    },
    totalExperience: {
      type: String,
       default: null
    },
    experienceWithSmartData: {
      type: String,
       default: null
    },
    relevantExperience: {
      type: String,
       default: null
    },
    presentAddress: [
      {
        address: {
        type: String,
         default: null
      },
      city: {
        type: String,
         default: null
      },
      state: {
        type: String,
         default: null
      },
      postalCode: {
        type: String,
         default: null
      },
      contactNo: {
        type: Number,
         default: null
      }
    }
    ],
    permanentAddress: [
      {
      address: {
        type: String,
         default: null
      },
      city: {
        type: String,
         default: null
      },
      state: {
        type: String,
         default: null
      },
      postalCode: {
        type: String,
         default: null
      },
      emergencyContactNo: {
        type: Number,
         default: null
      }
    }
    ],
    personalInformation: [
      {
      dateofBirth: {
        type: Date,
         default: null
      },
      bloodGroup: {
        type: String,
         default: null
      },
      panDetails: {
        type: String,
         default: null
      },
      whatsAppNumber: {
        type: String,
         default: null
      },
      vehicleDetails: {
        type: String,
         default: null
      },
      uploadResume: {
        type: String,
         default: null
      },
      maritalStatus: {
        type: String,
         default: null
      },
      relation: {
        type: String,
         default: null
      },
      age: {
        type: String,
         default: null
      },
      occupation: {
        type: String,
         default: null
      },
      aadhaarNumber: {
        type: String,
         default: null
      },

      uploadAadhaar: {
        type: String,
         default: null
      }
    }
    ],
    totalRelevantExp: {
      type: String,
       default: null
    },
    highestQualification: {
      type: String,
       default: null
    },
    totalRelevantExp: {
      type: String,
       default: null
    },
    yearofPassOut: {
      type: String,
       default: null
    },
    hardware: {
      type: String,
       default: null
    },
    operatingSystem: {
      type: String,
       default: null
    },
    profileImage:{
      type: String,
       default: null

    },
    uplodeSignature:{
      type: String,
       default: null
    },
    role:{
      type: String,
       default: null
    },
    roleType:{
      type: mongoose.Schema.Types.ObjectId,
        ref: "role"
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = userSchema;
