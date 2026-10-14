const { z } = require('zod');
const issueReportValidation = z.object({
  stationName: z.string().trim().min(1, "Station name is required"),
  issueType: z.enum([
    "Not charging",
    "Screen/payment",
    "Blocked bay",
    "Power outage",
    "Damaged",
    "Connector damaged",
    "Network issue",
    "Other",
  ], { required_error: "Issue type is required" }),
  description: z.string().trim().min(1, "Description is required"),
  reporterName: z.string().trim().nullable().optional(),
  photo: z.string().nullable().optional(),
  status: z.enum(["open", "in_progress", "resolved", "closed"]).default("open"),
});
module.exports = {issueReportValidation}