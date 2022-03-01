const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const mailer = require('./emailsender.js');

var UserSchema = mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },   // used for login
    displayName: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false },
    status: { type: Boolean, default: false }, // false is offline, true is online
    adminStatus: { type: Boolean, default: false } // false is user, true is admin
});

var User = mongoose.model('User', UserSchema);

module.exports.register = async function (req, res) {

    let inputUsername = req.body.username;
    let inputPassword = req.body.password;
    let inputEmail = req.body.email;

    try {
        // check username and email has been used or not
        // if yes, send response to frontend and ask 
        const duplicateName = await User.findOne({ username: inputUsername })
        const duplicateEmail = await User.findOne({ email: inputEmail })

        if (duplicateName || duplicateEmail) {
            let problem = {}
            if (duplicateName) {
                problem['usernameError'] = "Username has been used";
            }
            if (duplicateEmail) {
                problem['emailError'] = "Email has been used";
            }
            return res.status(422).json(problem)
        }

        //encrypt user password before store it into database
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(inputPassword, saltRounds);
        /*console.log("hashedPassword", hashedPassword)
        
        console.log(match)*/

        //get the lastest userID and do auto-increment
        const lastUserID = await User.findOne({}, { userId: 1 }).sort({ userId: -1 }).limit(1)

        await User.create({ userId: lastUserID.userId + 1, username: inputUsername, password: hashedPassword, email: inputEmail },
            async function (err, response) {
                if (err) {
                    console.log(err)
                    return res.status(422).json({ message: "Database Error" })
                }
                console.log(response)
                return res.send({ message: "Account created!" })
            })
    } catch (error) { console.log(error) };
}

module.exports.login = async function (req, res) {
    let inputUsername = req.body.username;
    let inputPassword = req.body.password;
    try {
        await User.findOneAndUpdate({ username: inputUsername }, { status: 1 }, async function (error, response) {
            if (!response)
                return res.send({ errorMsg: "No such user is found. Please try again." });
            else {
                const match = await bcrypt.compare(inputPassword, response.password);
                if (!match)
                    return res.send({ errorMsg: "Invalid Password. Please try again." });
                else {
                    return res.send({
                        errorMsg: "none",
                        username: response.username,
                        accessLevel: response.adminStatus,
                        userId: response._id
                    });
                }
            }
        }).clone().catch(function (error) { console.log(error) });
    } catch (error) { console.log(error) };
}

module.exports.logout = async function (req, res) {
    let inputUsername = req.body.username;
    try {
        await User.findOneAndUpdate({ username: inputUsername }, { status: 0 }, async function (error, response) {
            return res.send({
                logoutMsg: "You have successfully logged out!"
            });
        }).clone().catch(function (error) { console.log(error) });
    } catch (error) { console.log(error) };
}

module.exports.email = async function (req, res) {
    let mailOptions = {
        from: 'cusimulator3100@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
    };
    try {
        console.log('no worry, it is fine');
        mailer(mailOptions);
        return (res.send({ message: "Email sent!" }))

    } catch (error) {
        console.log(error);
    }
}

module.exports.test = async function (req, res) {
    try {
        const user = await User.findOne({ username: "administrator" });
        return res.send({
            username: user.username,
            password: user.password
        });
    } catch (error) { console.log(error) };
}

