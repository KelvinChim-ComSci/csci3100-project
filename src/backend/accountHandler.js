const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const mailer = require('./emailsender.js');
const statisticHandling = require('./statisticHandler.js');
const dotenv = require('dotenv');
const { ObjectId } = require('mongodb');
dotenv.config();

var UserSchema = mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },   // used for login
    displayName: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false },
    status: { type: Boolean, default: false }, // false is offline, true is online
    adminStatus: { type: Boolean, default: false }, // false is user, true is admin
    forgetPasswordLinkExpireTime: { type: Date, default: Date.now }
});

var User = mongoose.model('User', UserSchema);

//send verification email
function sendVerifyMail(mail, username, id) {
    let context = "Welcome to CU Simulator, " + username + "\n\n" +
        "Thank you for signing up with CU Simulator. Please activate your accoount by the following link:\n\n"
        + process.env.FRONTEND_URL + "/email/confirm/" + id;
    let mailOptions = {
        from: 'cusimulator3100@gmail.com',
        to: mail,
        subject: "[CU Simulator] Email address Confirmation",
        text: context
    };
    try {
        console.log('no worry, it is fine');
        mailer(mailOptions);
    } catch (error) {
        console.log(error);
    }
}

function sendforgetPasswordMail(mail, username, id) {
    let context = "Dear " + username + "," + "\n\n"
        + "You have received this email because you have forgotten your CU Simulator password. "
        + "If you believe you have received this email in error, please contact us at " + "cusimulator3100@gmail.com" + "\n\n"
        + "You can use the following link to reset your password now." + "\n\n"
        + process.env.FRONTEND_URL + "/changepassword/" + id + "\n\n"
        + "The above link will be expired after 12 hours, please reset the password soon.";
    let mailOptions = {
        from: "cusimulator3100@gmail.com",
        to: mail,
        subject: "[CU Simulator] Reset Password",
        text: context,
    };
    try {
        console.log('email sent!');
        mailer(mailOptions);
    } catch (error) {
        console.log(error);
    }
}

//user registration including send verification
module.exports.register = async function (req, res) {

    let inputUsername = req.body.username;
    let inputPassword = req.body.password;
    let inputEmail = req.body.email;

    try {
        // check username / email has been used or not
        // if yes, send response to frontend and ask user to enter another username / email
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

        //get the lastest userID and do auto-increment
        const lastUserID = await User.findOne({}, { userId: 1 }).sort({ userId: -1 }).limit(1)

        User.create({
            userId: lastUserID.userId + 1,
            displayName: inputUsername,
            username: inputUsername,
            password: hashedPassword,
            email: inputEmail
        },
            async function (err, response) {
                if (err) {
                    console.log(err)
                    return res.status(422).json({ message: "Database Error" })
                }
                console.log(response._id)

                // intialize user statistics
                await statisticHandling.initalizeStat(response.id);

                //send mail here
                await sendVerifyMail(inputEmail, inputUsername, response._id);
                return res.send({ message: "Account created!" })
            })
    } catch (error) { console.log(error) };
}

//check the email verification id is valid or not and the 
module.exports.confirmEmail = async function (req, res) {
    const id = req.params.id

    try {
        const user = await User.findById(id)
        if (!user) {
            return res.send({ message: "Invalid URL" }) // may route to another page later
        }
        else {
            if (user.verified == true) {
                return res.send({ message: user.username + ", your email has been verified" }) // email already verified
            } else {
                await User.findOneAndUpdate({ username: user.username }, { verified: true }); // verify email
                return res.send({ message: user.username + ", you have successfully verified your email!" })
            }
        }
    } catch (error) {
        console.log(error)
        return res.send({ message: "Invalid URL" })
    };
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
                        displayName: response.displayName,
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

//use later for resend email
module.exports.email = async function (req, res) {
    let mailOptions = {
        from: 'cusimulator3100@gmail.com',
        to: req.body.to,
        //subject: req.body.subject,
        subject: "[CU Simulator] Email adddress Confirmation",
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

module.exports.findFriendId = async function (username) {
    try {
        const user = await User.findOne({ username: username });
        if (user === null) return { error: 1 };
        return {
            friendId: user._id
        };
    } catch (error) { console.log(error) };
}

//use later for send email for reset password
module.exports.forgetPassword = async function (req, res) {
    let inputUsername = req.body.username

    try {
        const userdata = await User.findOne({ username: inputUsername }, { email: 1 })

        if (userdata == null) {
            console.log("username does not exist!")
            return res.send({ usernameError: "Username does not exist!" })
        } else {
            //send forget password email here
            await sendforgetPasswordMail(userdata.email, inputUsername, userdata._id);


            // calculate and update the time for the forget password link to expire
            let currentTime = new Date();
            let addedTime = new Date(currentTime.getTime() + 60 * 12 * 60000);
            console.log("currennttime", currentTime)
            console.log("time", addedTime)
            await User.findOneAndUpdate({ username: inputUsername }, { forgetPasswordLinkExpireTime: addedTime });
            return res.send({ message: "Forget password email sent!" })
        }


    } catch (error) { console.log(error) };
}

//check the reset password link is valid or not 
module.exports.checkResetLink = async function (req, res) {
    const id = req.params.id;
    if (id.length != 24) {
        return res.send({ validURL: false, message: "Invalid URL" });
    }

    try {
        const user = await User.findById(id, { forgetPasswordLinkExpireTime: 1 });
        if (!user) {
            return res.send({ validURL: false, message: "Invalid URL" }); // may route to another page later
        }
        else {
            const expireTime = user.forgetPasswordLinkExpireTime;
            const currentTime = new Date();

            // check if the reset password link is expired
            if (expireTime.getTime() - currentTime.getTime() < 0) {
                return res.send({ validURL: false, message: "The link has been expired" });
            } else {
                return res.send({ validURL: true, message: "valid" });
            }

        }
    } catch (error) {
        console.log(error)
        return res.send({ validURL: false, message: "Unknown server error" })
    };
}

// reset user password
module.exports.resetPassword = async function (req, res) {

    let inputPassword = req.body.password;

    try {
        const userdata = await User.findOne({ _id: req.body.id }, { password: 1 });

        const match = await bcrypt.compare(inputPassword, userdata.password);
        if (match) return res.send({ passwordError: "The new password cannot be the same as the original password" });


        // encrypt user new password before store it into database
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(inputPassword, saltRounds);

        const currentTime = new Date();

        // reset password
        await User.findOneAndUpdate({ _id: req.body.id }, { password: hashedPassword, forgetPasswordLinkExpireTime: currentTime },
            function (err, response) {
                if (err) {
                    console.log(err)
                    return res.status(422).json({ message: "Database Error" })
                }
                console.log(response._id)

                //send mail here
                //await sendVerifyMail(inputEmail, inputUsername, response._id);
                return res.send({ message: "Password changed!" })
            }).clone().catch(function (err) { console.log(err) })
    } catch (error) { console.log(error) };
}

module.exports.findRandomUsers = async function (req, res) {
    try {
        let userId = req.body.userId;
        User.aggregate([
            {
                $match: {
                    $and: [
                        { _id: { '$ne': ObjectId(userId) } },
                        { adminStatus: { '$ne': true } }
                    ]
                }
            },
            { $sample: { size: 5 } } // You want to get 5 docs
        ])
            .then((data) => {
                let userList = data.map((pair) => {
                    return ({
                        displayName: pair.displayName,
                        username: pair.username,
                        userId: pair._id
                    });
                });
                return res.send({ users: userList });
            });
    } catch (error) { console.log(error) };
}

module.exports.changeDisplayName = async function (req, res) {
    try {
        const userId = req.body.userId;
        const newDisplayName = req.body.displayName;
        User.findOneAndUpdate({ _id: userId }, { displayName: newDisplayName }, 
            function (err, response) {
                if (err) {
                    console.log(err);
                    return res.status(422).send({ message: "Something went wrong. Please try again."});
                } else {
                    return res.send({ message: "Successfully updated display name!" });
                }
            }).clone().catch(function (err) { console.log(err) });
    } catch (error) { console.log(error) };
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

