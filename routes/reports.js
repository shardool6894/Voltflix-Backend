const express = require('express')
const reportRouter = express.Router();
const { getAllReports, createReport, updateReportStatus, dismissReport } = require('../controllers/reports')
const { validateRequest } = require('../middleware/zod')
const { middleWareFn, requireAdmin } = require('../middleware/auth')
const { upload } = require('../middleware/multer')
const { issueReportValidation } = require('../zodSchemas/reports')
reportRouter.get('/', getAllReports)
reportRouter.post('/', upload.single('photo'), validateRequest(issueReportValidation), createReport)
reportRouter.patch('/:id/resolve', middleWareFn, requireAdmin, updateReportStatus)
reportRouter.patch("/:id/dismiss", middleWareFn, requireAdmin, dismissReport);
module.exports = { reportRouter }