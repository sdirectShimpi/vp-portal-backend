const mongoose = require("mongoose");
const DSRSchema = new mongoose.Schema(
  {

    currentStatus: {
      type: String,
      default: null,
    },

    projectStatus: {
      type: String,
      default: null,
    },
    fillDate: {
      type: String,
      default: null,
    },




    programming: {
      type: String,
      default: null,
    },
    Testing: {
      type: String,
      default: null,
    },
    bugFixing: {
      type: String,
      default: null,
    },
    meeting: {
      type: String,
      default: null,
    },
    projectManagement: {
      type: String,
      default: null,
    },
    systemAnalysis: {
      type: String,
      default: null,
    },
    reviews: {
      type: String,
      default: null,
    },
    totalHour: {
      type: String,
      default: null,
    },



    userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    projectDetails: [
        {
          
          type: mongoose.Schema.Types.ObjectId,
          ref: "project",
    
        }
      ],

    
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = DSRSchema;
