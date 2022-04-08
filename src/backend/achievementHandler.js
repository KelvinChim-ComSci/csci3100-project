const mongoose = require('mongoose');

var AchievementSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sociable: { type:Boolean,required: true }, //get one girl friend
    fxxxboy: { type:Boolean,required: true }, //get three or more girl friend 
    happyjai: { type:Boolean,required: true }, //income too high
    nerd: { type:Boolean,required: true }, //happiness too high
    tooStronk4u: { type:Boolean,required: true }, //sport too high
    whoEvenStudies: { type:Boolean,required: true }, //no study in a whole sem
    futureSecurityGuard: { type:Boolean,required: true }, //ends with $0 income
    emotionalDamage: { type:Boolean,required: true }, //end with 0 happiness
});
var Achievement = mongoose.model('Achievement', AchievementSchema);

{/*
const data = {
    user: "621bab81c74d97546edc007f" ,
    sociable: true,
    fxxxboy: false,
    happyjai: false,
    nerd: false,
    tooStronk4u: false,
    whoEvenStudies: false,
    futureSecurityGuard: false,
    emotionalDamage: false
};

//Saving data to mongo database

//var newUser = User(data);
var newAchievement = Achievement(data);

newAchievement.save((error) => {
     if(error){
         console.log(error);
    }else{
        console.log('Data Saved');
    }
});
*/}

module.exports.achievementUpdate = async function (req, res) {
    Achievement.findOneAndUpdate({ user: req.body.userId }, {
        $set: {
            sociable: req.body.sociable,
            fxxxboy: req.body.fxxxboy,
            happyjai: req.body.happyjai,
            nerd: req.body.nerd,
            tooStronk4u: req.body.tooStronk4u,
            whoEvenStudies: req.body.whoEvenStudies,
            futureSecurityGuard: req.body.futureSecurityGuard,
            emotionalDamage: req.body.emotionalDamage,
        }
    }, {
        new: true
    }, async function (error, response) {
        if (error) return console.log(error)
        else return console.log("Data saved successfully.");
    })
}

module.exports.achievement = async function (req, res) {
    console.log('hello1 ');
    console.log(req.params.userId);
    Achievement.findOne({user:req.params.userId}) //req.params.userId 
        .then((data) => {
            console.log('data');
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
}

// initialize user information
module.exports.initalizeAchievement = async function (userId) {
    await Achievement.create({
        user: userId ,
        sociable: false,
        fxxxboy: false,
        happyjai: false,
        nerd: false,
        tooStronk4u: false,
        whoEvenStudies: false,
        futureSecurityGuard: false,
        emotionalDamage: false},
        async function (err, response) {
            if (err) {
                console.log(err)
                return err
            }
            return response
        })
}

