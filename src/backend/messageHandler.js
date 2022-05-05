/**************************************************************************************** 
This is a message handler in the backend server. This file is in charge of fetching,
sending and deleting the messages in chatroom. It links to the corresponding collections 
in database.

Last updated: 29/4/2022 by Chim Ka Chun
****************************************************************************************/

const mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String },
    date: { type: String },
    time: { type: String }
});
var Message = mongoose.model('Message', MessageSchema);

// find the message records and display it
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

// Send the message to friends
module.exports.sendMessage = async function (req, res) {
    try {
        const friendId = req.body.friendId;
        const userId = req.body.userId;
        const message = req.body.message;
        const currentFullDate = new Date();
        let currentDate = `${currentFullDate.getFullYear()}-${('0' + (currentFullDate.getMonth() + 1)).slice(-2)}-${('0' + currentFullDate.getDate()).slice(-2)}`;
        let currentTime = `${('0' + currentFullDate.getHours()).slice(-2)}:${('0' + currentFullDate.getMinutes()).slice(-2)}:${('0' + currentFullDate.getSeconds()).slice(-2)}`;
        Message.create({
            sender: userId,
            receiver: friendId,
            message: message,
            date: currentDate,
            time: currentTime
        })
        .then(res.send({ message: "Message sent." }))
        .catch((error) => console.log(error));
    } catch (error) { console.log(error) };
}

// delete all the message in chatroom
module.exports.deleteAllMessage = async function (userId, friendId) {
    try {
        const deletedMessages = await Message.deleteMany({
            $or: [
                { $and: [{ receiver: friendId }, { sender: userId }] },
                { $and: [{ receiver: userId }, { sender: friendId }] }
            ]
        });
        return { deletedCount: deletedMessages.deletedCount };
    } catch (error) { console.log(error) };
}