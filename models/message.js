const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    existingUserId: {
        type : String
    },
    existingUserName: {
        type : String
    },
    message: {
        type : String,
        required : true
    },
    time: {
        type : String,
        required : true
    },
})
module.exports = mongoose.model('Message', messageSchema);