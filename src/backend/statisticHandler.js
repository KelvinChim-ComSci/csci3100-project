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
    eventProgress: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});
var Statistic = mongoose.model('Statistic', StatSchema);

module.exports.statUpdate = async function (req, res) {
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
        else return console.log("Data saved successfully.");
    })
}

module.exports.stat = async function (req, res) {
    Statistic.findOne({ user: req.body.userId })
        .then((data) => {
            console.log('Data updated!');
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
}

// initialize user information
module.exports.initalizeStat = async function (userId) {
    await Statistic.create({ gpa: 25, sports: 25, happiness: 25, money: 25, sem: 1, stamina: 100, year: 1, user: userId },
        async function (err, response) {
            if (err) {
                console.log(err)
                return err
            }
            return response
        })
}