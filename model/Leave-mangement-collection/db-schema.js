const mongoose = require("mongoose");
const leaveSchema = new mongoose.Schema(
  {
    leaveContent: {
      type: String,
      default: null,
    },
    applyDate: {
      type: Date,
      default: null,
    },

    approveStatus: {
      type: Boolean,
      default: false,
    },

    userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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

module.exports = leaveSchema;
