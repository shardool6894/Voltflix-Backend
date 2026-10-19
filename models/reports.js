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
    // Set only when the report was submitted by a signed-in user (anonymous reports stay null)
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
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

issueReportSchema.index({ reporter: 1, createdAt: -1 });

const issueReportModel = mongoose.model("IssueReport", issueReportSchema);
module.exports = {issueReportModel}