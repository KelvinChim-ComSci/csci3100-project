/**************************************************************************************** 
This is a statistic handler in the backend server. This file is in charge of retrieving,
updating, initializing and resetting the statistics of user. It links to the 
corresponding collections in database.

Last updated: 29/4/2022 by Wong Yi Oi
****************************************************************************************/

const mongoose = require('mongoose');

var StatSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    gpa: { type: Number, required: true },
    sports: { type: Number, required: true },
    happiness: { type: Number, required: true },
    money: { type: Number, required: true },
    stamina: { type: Number, required: true },
    year: { type: Number, required: true },
    sem: { type: Number, required: true },
});
var Statistic = mongoose.model('Statistic', StatSchema);

//update the statistics of the user
module.exports.statUpdate = async function (req, res) {
    try {
        Statistic.findOneAndUpdate({ user: req.body.userId }, {
            $set: {
                gpa: parseInt(req.body.gpa),
                happiness: parseInt(req.body.happiness),
                money: parseInt(req.body.money),
                sem: parseInt(req.body.sem),
                year: parseInt(req.body.year),
                sports: parseInt(req.body.sports),
                stamina: parseInt(req.body.stamina),
            }
        }, {
            new: true
        }, async function (error, response) {
            if (error) return console.log(error)
            else return res.send( { message: "successfully updated!" });
        })
    } catch (error) { console.log(error) };
}

//retrieve the statistics of the user
module.exports.stat = async function (req, res) {
    Statistic.findOne({ user: req.params.userId })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
}

// initialize user information
module.exports.initalizeStat = async function (userId) {
    await Statistic.create({
        gpa: 1, 
        sports: 0, 
        happiness: 0, 
        money: 0, 
        sem: 0, 
        stamina: 100,
        year: 1, 
        user: userId },
        async function (err, response) {
            if (err) {
                console.log(err)
                return err
            }
            return response
        })
}

//reset the statistics of the user
module.exports.resetStat = async function (req, res) { // not yet in frontend
    await Statistic.findOneAndUpdate({ user: req.body.userId }, { gpa: 1, sports: 0, happiness: 0, money: 0, sem: 1, stamina: 100, year: 1 },
        async function (err, response) {
            if (err) {
                console.log(err)
                return err;
            }
            return res.send({ message: "data updated!" });
        })
}