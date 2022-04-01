const mongoose = require('mongoose');
const accountHandling = require('./accountHandler.js');
const friendHandling = require('./friendHandler.js');

var MessageSchema = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String },
    date: { type: String },
    time: { type: String }
});
var Message = mongoose.model('Message', MessageSchema);

module.exports.fetchPreviousMessages = async function (req, res) {
    try {
        const friendId = req.body.friendId;
        const userId = req.body.userId;
        Message.find({
            $or: [
                { $and: [{ receiver: req.body.friendId }, { sender: req.body.userId }] },
                { $and: [{ receiver: req.body.userId }, { sender: req.body.friendId }] }
            ]
        }).sort({ date: 1, time: 1 })
        .then((data) => {
            if (Object.keys(data).length === 0) {
                return res.send({ emptyMessageList: 1 })
            };
            let MessageList = data.map(message => {
                return (message.sender == userId) ? {
                    from: userId,
                    text: message.message
                } : {
                    from: friendId,
                    text: message.message
                };
            });
            return res.send({ messageList: MessageList });
        });
    } catch (error) { console.log(error) };
};

module.exports.sendMessage = async function (req, res) {
    try {
        const friendId = req.body.friendId;
        const userId = req.body.userId;
        const message = req.body.message;
        const currentFullDate = new Date();
        let currentDate = `${currentFullDate.getFullYear()}-${currentFullDate.getMonth() + 1}-${currentFullDate.getDate()}`;
        let currentTIme = `${currentFullDate.getHours()}:${currentFullDate.getMinutes()}:${currentFullDate.getSeconds()}`;
        Message.create({
            sender: userId,
            receiver: friendId,
            message: message,
            date: currentDate,
            time: currentTIme
        })
        .then(res.send({ message: "Message sent." }))
        .catch((error) => console.log(error));
    } catch (error) { console.log(error) };
}