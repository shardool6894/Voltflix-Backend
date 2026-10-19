const { getAllReportsServices, createReportServices, updateReportStatusServices, dismissReportServices, getMyReportsServices } = require('../services/reports')
const getAllReports = async (req, res, next) => {
    try {
        const { data, pagination } = await getAllReportsServices(req.query)
        res.status(200).json({
            success: true,
            data: data,
            pagination: pagination
        })
    }
    catch (err) {
        next(err)
    }
}
const createReport = async (req, res, next) => {
    try {
        const inputData = {
            stationName: req.body.stationName,
            issueType: req.body.issueType,
            description: req.body.description,
            reporterName: req.body.reporterName,
            photo: req.file ? req.file.path : null,
            reporter: req.user ? req.user.id : null
        }
        const data = await createReportServices(inputData)
        res.status(200).send({
            success: true,
            data: data
        })
    }
    catch (err) {
        next(err)
    }
}
const updateReportStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { stationStatus } = req.body;
        const data = await updateReportStatusServices(req.user.id, req.params.id, stationStatus)
        res.json({
            success: true,
            message: "Report resolved successfully",
            data: data
        });
    }
    catch (err) {
        next(err)
    }
}
const dismissReport = async (req, res, next) => {
    try {
        await dismissReportServices(req.user.id, req.params.id);
        res.json({
            success: true,
            message: "Report dismissed"
        });
    }
    catch (err) {
        next(err)
    }
}
const getMyReports = async (req, res, next) => {
    try {
        const { data, summary, pagination } = await getMyReportsServices(req.user.id, req.query)
        res.status(200).json({
            success: true,
            data: data,
            summary: summary,
            pagination: pagination
        })
    }
    catch (err) {
        next(err)
    }
}
module.exports = { getAllReports, createReport, updateReportStatus, dismissReport, getMyReports }