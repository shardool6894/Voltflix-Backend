const express = require('express')
const statRouter = express.Router();
const {getAllStats} = require('../controllers/stats');
// statRouter.get('/tracked', stationsTracked);
// statRouter.get('/reported-today', reportedToday);
// statRouter.get('/fixed-this-week', fixedThisWeek);
statRouter.get('/',getAllStats);
module.exports = { statRouter }