const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    status: { type: Boolean, required: true }, // 0 is offline, 1 is online
    adminStatus: { type: Boolean, required: true } // 0 is user, 1 is admin
});

var User = mongoose.model('User', UserSchema);

module.exports.login = async function (req, res) {
    let inputUsername = req.body.username;
    let inputPassword = req.body.password;
    try {
        await User.findOne({ username: inputUsername }, async function (error, response) {
            if (!response)
                return res.send({ errorMsg: "No such user is found. Please try again." }); // subject to change by panda
            else {
                if (!(inputPassword === response.password))
                    return res.send({ errorMsg: "Invalid Password. Please try again." }); // subject to change
                else {
                    return res.send({
                        errorMsg: "none",
                        username: response.username,
                        accessLevel: response.adminStatus
                    });
                }
            }
        }).clone().catch(function (error) { console.log(error) });
    } catch (error) {console.log(error)};
}

module.exports.test = async function (req,res) {
    try {
        const user = await User.findOne({ username: "administrator" });
        return res.send({
            username: user.username,
            password: user.password
        });
    } catch (error) {console.log(error)};
}