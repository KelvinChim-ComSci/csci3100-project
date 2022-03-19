const mongoose = require('mongoose');
const accountHandling = require('./accountHandler.js');

var FriendListSchema = mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    accepted: { type: Boolean, required: true } // 0 is false, 1 is true
});
var FriendList = mongoose.model('FriendList', FriendListSchema);

module.exports.sendRequest = async function (req, res) {
    try {
        let friendData = await accountHandling.findFriendId(req.body.friendName);
        let userId = req.body.userId;
        if (friendData.error) return res.send({ message: "No such user exist!"});
        if (friendData.friendId == userId)
            return res.send({ message: "You cannot add yourself as friend!"});

        FriendList.create({ 
            requester: userId,
            recipent: friendData.friendId,
            accepted: 0
        })
        .then(res.send({
            message: "Request sent! A request has been sent to this user. \
            You will see them online if they accept your request."
        }))
    } catch (error) { console.log(error) };
}