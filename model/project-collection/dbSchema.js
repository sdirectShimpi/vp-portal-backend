const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      default: null,
    },
    branch: {
      type: String,
      default: null,
    },
    clientName: {
      type: String,
      default: null,
    },
    clientAddress: {
      type: String,
      default: null,
    },
    clientEmail: {
      type: String,
      default: null,
    },
    clientPhone: {
      type: String,
      default: null,
    },
    bdgMember: {
      type: String,
      default: null,
    },
    seniorManager: {
      type: String,
      default: null,
    },
    manager: {
      type: String,
      default: null,
    },
    po: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    scrumMaster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    team: [
      {
        
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
  
      },
    ],



    shift: {
        type: String,
         default: null,
       },
    tech: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    timing: {
      type: Date,
      default: null,
    },
    gitRepo: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    projectPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projectPlan",
    },

    userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    totalProject: {
      type: String,
      default: null,
    },

    totalExprince:{
        type: String,
      default: null,

    },
    activeProject:
    {
        type: String,
        default: null,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = projectSchema;
