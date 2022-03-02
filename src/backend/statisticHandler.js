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

module.exports.addStat = async function(req, res) {
    console.log(req.body.val);
    console.log("req.body.corr", req.body.corr);
    let corr = String(req.body.corr);
    let userId = req.body.id;
    switch (corr) {
        case "gpa": {
            let userStat = await Statistic.findOneAndUpdate({ _id: userId }, { gpa: req.body.val + 1 });
            return res.send(userStat);
        }
        case "sports": {
            let userStat = await Statistic.findOneAndUpdate({ _id: userId }, { sports: req.body.val + 1 });
            return res.send(userStat);
        }
        case "happiness": {
            let userStat = await Statistic.findOneAndUpdate({ _id: userId }, { happiness: req.body.val + 1 });
            return res.send(userStat);
        }
        case "money": {
            let userStat = await Statistic.findOneAndUpdate({ _id: userId }, { money: req.body.val + 1 });
            return res.send(userStat);
        }
        default: console.log("not into any case");
    }
}

module.exports.stat = async function(req, res) {
    console.log(req.body.userId);
    Statistic.findOne({ user: req.body.userId })
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
}