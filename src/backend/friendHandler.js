const mongoose = require('mongoose');
const accountHandling = require('./accountHandler.js');

var FriendListSchema = mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    accepted: { type: Boolean, required: true } // 0 is false, 1 is true
});
var FriendList = mongoose.model('FriendList', FriendListSchema);


module.exports.sendRequest = async function (req, res) {
    try {
        let friendData = await accountHandling.findFriendId(req.body.friendName);
        if (friendData.error) return res.send({ message: "No such user exist!"});
        let userId = req.body.userId;
        let requestCondition = await this.checkRequestCondition(userId, friendData.friendId);

        if (requestCondition.action === "direct addition") {
            const update = { accepted : true };
            FriendList.findOneAndUpdate({
            $and: [{ requester: friendData.friendId } , { recipient: userId }] 
            }, update)
            .then( res.send({ message: "successfully accepted request." }));
        };
        if (requestCondition.message === "No error") {
            FriendList.create({ 
                requester: userId,
                recipient: friendData.friendId,
                accepted: 0
            })
            .then(res.send({
                message: "Request sent! A request has been sent to this user. \
                You will see them online if they accept your request."
            }))
        } else { 
            res.send({ message: requestCondition.message })
        };
    } catch (error) { console.log(error) };
}

module.exports.checkRequestCondition = async function (userId, friendId) {
    try {
        if (friendId == userId) return { message: "You cannot add yourself as friend!" };
        let existingRequest = await FriendList.findOne({
            $and: [{ accepted: false }, { requester: userId }, { recipient: friendId }]
        });
        if (existingRequest !== null) return { message: "You have already sent a friend request to this Player!" };
        let pendingFromFriend = await FriendList.findOne({
            $and: [{ accepted: false }, { requester: friendId }, { recipient: userId }]
        });
        if (pendingFromFriend !== null) return { action: "direct addition" };
        let alreadyFriend = await FriendList.findOne({
            $or: [ 
                { $and: [
                    { requester: userId }, { recipient: friendId }, { accepted: true }
                ]},
                { $and: [
                    { requester: friendId }, { recipient: userId }, { accepted: true }
                ]}
            ]
        });
        if (alreadyFriend !== null) return { message: "Player and you are already friends!" };
        return { message: "No error" };
    } catch (error) { console.log(error) };
}



module.exports.getFriendList = async function (req, res) {
    try {
        FriendList.find({
            $or: [{
                requester: req.body.userId
            },
            {
                recipient: req.body.userId
            }], 
            $and: [{accepted: true}]
        })
        .populate('requester').populate('recipient')
        .then((data) => {
            let friendList = data.map(pair => {
                return (pair.recipient._id == req.body.userId) ? {
                    displayName: pair.requester.displayName,
                    username: pair.requester.username,
                    status: pair.requester.status,
                    id: pair.requester._id
                } : {
                    displayName: pair.recipient.displayName,
                    username: pair.recipient.username,
                    status: pair.recipient.status,
                    id: pair.recipient._id
                };
            });
            return res.send({ friendList: friendList });
        });

    } catch (error) { console.log(error) };
}

module.exports.checkIncomingRequest = async function (req, res) {
    try {
        FriendList.find({
            $and: [{ accepted: false } , { recipient: req.body.userId }] 
        })
        .populate('requester')
        .then((data) => {
            let incomingRequest = data.map(pair => {
                return { username: pair.requester.username, id: pair.requester._id }
            });
            return res.send({ incomingRequest: incomingRequest })
        });
    } catch (error) { console.log(error) };
}

module.exports.manageIncomingRequest = async function (req, res) {
    try {
        if (req.body.action === "accept") {
            const update = { accepted : true };
            FriendList.findOneAndUpdate({
                $and: [{ requester: req.body.friendId } , { recipient: req.body.userId }] 
            }, update)
            .then( res.send({ message: "Successfully accepted request! Please repoen friend list\
            to see the newly added friend!" }))
        } else if (req.body.action === "reject") {
            FriendList.findOneAndDelete({
                $and: [{ requester: req.body.friendId } , { recipient: req.body.userId }] 
            })
            .then( res.send({ message: "Successfully rejected request." }))
        } else if (req.body.action === "delete") {
            FriendList.findOneAndDelete({
                $or: [
                    { $and: [{ requester: req.body.friendId }, { recipient: req.body.userId }] },
                    { $and: [{ requester: req.body.userId }, { recipient: req.body.friendId }] }
                ]
            })
            .then( res.send({ message: "Successfully deleted friend." }))
        } else res.send({ message: "An unexpected event has occurred. Please try again."});
    } catch (error) { console.log(error) };
}