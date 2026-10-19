const Message = require('../models/message');
const getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find().sort({ time: 1 });
        res.status(200).json({
            success: true,
            data: messages
        })
    } catch (error) {
        next(error);
    }
}
module.exports = { getMessages }