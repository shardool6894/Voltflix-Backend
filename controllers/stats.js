const { success } = require('zod');
const {stationsTrackedServices,reportedTodayServices,fixedThisWeekServices} = require('../services/stats')
const getAllStats = async (req,res,next) => { 
    try {
        const stationsTracked = await stationsTrackedServices();
        const reportedToday = await reportedTodayServices();
        const fixedThisWeek = await fixedThisWeekServices();
        res.status(200).send({
            success : true,
            data : {stationsTracked,reportedToday,fixedThisWeek}
        })
    }
    catch(err){
        next(err);
    }
}
// const stationsTracked = async (req,res,next) => {
//     try{
//         const number = await stationsTrackedServices();
//         res.status(200).send({
//             success : true, 
//             data : number
//         })
//     }
//     catch(err){
//         next(err);
//     }
// }
// const reportedToday = async (req,res,next) => {
//     try{
//         const data = await reportedTodayServices()
//         res.status(200).send({
//             success : true, 
//             data : data
//         })
//     }
//     catch(err){
//         next(err);
//     }
// }
// const fixedThisWeek = async (req,res,next) => {
//     try{
//         const data = await fixedThisWeekServices();
//         res.status(200).send({
//             success : true, 
//             data : data
//         })
//     }
//     catch(err){
//         next(err);
//     }
// }
module.exports = {getAllStats}