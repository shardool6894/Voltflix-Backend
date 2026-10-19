const express = require('express')
const cors = require("cors");
const http = require("http")
const cookieParser = require('cookie-parser');
const path = require('path')
const app = express()
const { connectRedis } = require('./config/redis')
const { connectDB } = require('./config/database');
const { stationRouter } = require("./routes/stations");
const { reportRouter } = require("./routes/reports");
const { statRouter } = require("./routes/stats");
const { authRouter } = require('./routes/auth')
const { messageRouter } = require('./routes/messages')
const { globalLimiter } = require('./middleware/rateLimiter')
const { errorHandler } = require('./utils/error')
const dotenv = require('dotenv').config()
const { initializeSocket } = require('./utils/sockets')
const server = http.createServer(app);
app.use(cors({
  origin: 'http://localhost:5173', // Specifically allow your frontend origin
  credentials: true, // Allow cookies and authorization headers to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers in the request
}));
initializeSocket(server); 
app.use(cookieParser(process.env.COOKIE_PARSER_Secret));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'frontend')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', globalLimiter)
app.use("/api/stations", stationRouter);
app.use("/api/reports", reportRouter);
app.use("/api/stats", statRouter);
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use(errorHandler);
(async () => {
    try {
        const databaseConnection = await connectDB();
        const redisConnection = await connectRedis();
        server.listen(5000, () => {
            console.log('server running on port 5000')
        })
    }
    catch (err) {
        console.log(`error:${err.message}`)
        process.exit(1)
    }
})();
module.exports = app;