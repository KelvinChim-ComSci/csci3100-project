const mongoose = require('mongoose');
const accountHandling = require('./accountHandler.js');
const messageHandling = require('./messageHandler.js');

var FriendListSchema = mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    accepted: { type: Boolean, required: true }, // 0 is false, 1 is true
    giftToRecipient: { type: Number },
    recipientHasGift: { type: Boolean, default: false },
    giftToRequester: { type: Number },
    requesterHasGift: { type: Boolean, default: false } 
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
                message: "Request sent! A request has been sent to this user." +
                " You will see them online if they accept your request."
            }))
        } else { 
            res.send({ message: requestCondition.message })
        };
    } catch (error) { console.log(error) };
}

module.exports.checkRequestCondition = async function (userId, friendId) {
    try {
        if (friendId === userId) return { message: "You cannot add yourself as friend!" };
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
                const isUserRecipient = (pair.recipient._id == req.body.userId);
                return (isUserRecipient) ? {
                    displayName: pair.requester.displayName,
                    username: pair.requester.username,
                    aboutMe: pair.requester.aboutMe,
                    status: pair.requester.status,
                    id: pair.requester._id,
                    hasGiftToUser: pair.recipientHasGift
                } : {
                    displayName: pair.recipient.displayName,
                    username: pair.recipient.username,
                    aboutMe: pair.recipient.aboutMe,
                    status: pair.recipient.status,
                    id: pair.recipient._id,
                    hasGiftToUser: pair.requesterHasGift
                };
            });
            return res.send({ friendList: friendList });
        });

    } catch (error) { console.log(error) };
}

module.exports.sendGiftToFriend = async function (req, res) {
    try {
        const userId = req.body.userId;
        const friendId = req.body.friendId;
        const giftingTime = new Date().getTime();
        FriendList.findOne({
            $or: [
                { $and: [{ recipient: friendId }, { requester: userId }] },
                { $and: [{ recipient: userId }, { requester: friendId }] }
            ], 
            $and: [{accepted: true}]
        })
        .then((data) => {
            if (data === null || data === []) return res.send({ message: "Something went wrong." });
            const isUserRecipient = (data.recipient._id == userId);

            if (isUserRecipient && data.giftToRequester === undefined) {
                return FriendList.updateOne({ _id: data._id }, { $set: { giftToRequester: giftingTime, requesterHasGift: true } }, { upsert: true })
                .then( res.send({ message: "Gift sent to player!" }) );
            } else if (!isUserRecipient && data.giftToRecipient === undefined) {
                return FriendList.updateOne({ _id: data._id }, { $set: { giftToRecipient: giftingTime, recipientHasGift: true } }, { upsert: true })
                .then( res.send({ message: "Gift sent to player!" }) );
            }
            
            const lastGiftingTime = (isUserRecipient)? data.giftToRequester : data.giftToRecipient;
            const timeDiff = (giftingTime - lastGiftingTime) / 3.6e6;
            const giftCoolDown = 2; // Hour
            if (timeDiff < giftCoolDown) {
                const remainingMinute = (giftCoolDown - timeDiff) * 60;
                return res.send({ message: `You still need ${Math.round(remainingMinute)} minutes before sending another gift to the player!` })
            } else if (isUserRecipient) {
                return FriendList.updateOne({ _id: data._id }, { $set: { giftToRequester: giftingTime, requesterHasGift: true } })
                .then( res.send({ message: "Gift sent to player!" }) );
            } else {
                return FriendList.updateOne({ _id: data._id }, { $set: { giftToRecipient: giftingTime, requesterHasGift: true } })
                .then( res.send({ message: "Gift sent to player!" }) );
            }
        })
    } catch (error) { console.log(error) };
}

module.exports.receivedGift = async function (req, res) {
    try {
        const userId = req.body.userId;
        const friendId = req.body.friendId;
        FriendList.findOne({
            $or: [
                { $and: [{ recipient: friendId }, { requester: userId }] },
                { $and: [{ recipient: userId }, { requester: friendId }] }
            ], 
            $and: [{accepted: true}]
        })
        .then((data) => {
            if (data === null || data === []) return res.send({ message: "Something went wrong." });

            const isUserRecipient = (data.recipient._id == userId);
            if (isUserRecipient && data.recipientHasGift) {
                
                return FriendList.updateOne({ _id: data._id }, { $set: { recipientHasGift: false } })
                .then( res.send({ message: "has gifted some stamina for you!" }) );
            } else if (!isUserRecipient && data.requesterHasGift) {
                return FriendList.updateOne({ _id: data._id }, { $set: { requesterHasGift: false } })
                .then( res.send({ message: "has gifted some stamina for you!" }) );
            }
            return res.send({ message: "nothing" });
        })
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
            let deletedCount = await messageHandling.deleteAllMessage(req.body.userId, req.body.friendId);
            FriendList.findOneAndDelete({
                $or: [
                    { $and: [{ requester: req.body.friendId }, { recipient: req.body.userId }] },
                    { $and: [{ requester: req.body.userId }, { recipient: req.body.friendId }] }
                ]
            })
        .then( res.send({ message: `Successfully deleted friend, ${deletedCount.deletedCount} messages deleted.` }))
        } else res.send({ message: "An unexpected event has occurred. Please try again."});
    } catch (error) { console.log(error) };
}