const mongoose = require("mongoose");

const issueReportSchema = new mongoose.Schema(
  {
    stationName: {
      type: String,
      required: true,
      trim: true,
      ref: "ChargingStation"
    },
    issueType: {
      type: String,
      required: true,
      enum: [
        "Not charging",
        "Screen/payment",
        "Blocked bay",
        "Damaged",
        "Power outage",
        "Connector damaged",
        "Network issue",
        "Other",
      ],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    reporterName: {
      type: String,
      default: null,
      trim: true,
    },
    photo: {
      type: String,
      default: null, 
    },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

const issueReportModel = mongoose.model("IssueReport", issueReportSchema);
module.exports = {issueReportModel}