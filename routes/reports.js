const express = require('express')
const reportRouter = express.Router();
const { getAllReports, createReport, updateReportStatus, dismissReport, getMyReports } = require('../controllers/reports')
const { validateRequest } = require('../middleware/zod')
const { middleWareFn, optionalAuth, requireAdmin } = require('../middleware/auth')
const { upload } = require('../middleware/multer')
const { issueReportValidation } = require('../zodSchemas/reports')
reportRouter.get('/', getAllReports)
reportRouter.get('/mine', middleWareFn, getMyReports)
reportRouter.post('/', optionalAuth, upload.single('photo'), validateRequest(issueReportValidation), createReport)
reportRouter.patch('/:id/resolve', middleWareFn, requireAdmin, updateReportStatus)
reportRouter.patch("/:id/dismiss", middleWareFn, requireAdmin, dismissReport);
module.exports = { reportRouter }