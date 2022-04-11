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
  
module.exports.achievementUpdate = async function (req, res) {

   // array = [sociable,fxxxboy,happyjai,nerd,tooStronk4u,whoEvenStudies,futureSecurityGuard, emotionalDamage];
   let array = ["sociable","fxxxboy","happyjai","nerd","tooStronk4u","whoEvenStudies","futureSecurityGuard", "emotionalDamage"];
  
    for (let index = 0; index < array.length; index++) {
       if (array[index] === req.body.achievement) {
           var e = array[index];
           var set = {};
           set[e] = true;
        }       
    }

    Achievement.findOneAndUpdate({ user: req.body.userId }, {
        $set: set    
    }, {
        new: true
    }, async function (error, response) {
        if (error) return console.log(error)
        else {
            return res.send({ message: `You have unlocked an achievement: ${req.body.achievement}! Check it out in your profile!`})
        };
    })
}

module.exports.achievement = async function (req, res) {
    Achievement.findOne({user:req.params.userId}) //req.params.userId 
        .then((data) => {
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

