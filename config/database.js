const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const connectDB = async () => {
    await mongoose.connect(process.env.Mongoose_URL);
    console.log('DB connected successfully')
}
module.exports = {connectDB}