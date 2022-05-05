/**************************************************************************************** 
This is a profile handler in the backend server. This file is in charge of retrieving or 
updating the image in profile. It links to the corresponding collections in database.

Last updated: 29/4/2022 by Wong Yi Oi
****************************************************************************************/

var mongoose = require('mongoose');
var fs = require('fs');

var ProfileImgSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	data: Buffer,
	contentType: String,
});

var ProfileImg = mongoose.model('ProfileImg', ProfileImgSchema);

//Fetch the profile image of the user
module.exports.profileImgRetrieve = async function (req, res) {
	ProfileImg.findOne({ user: req.params.userId }) // req.params.userId 
        .then((data) => {
			if (data === null) res.send({ pics: "" });
			else {
					res.json({
					pics: data.data.toString('base64') //decode
            	});
			}
           
        })
        .catch((error) => {
            console.log('error: ', error);
        });
}

//Update the profile image of the user
module.exports.profileImgPost = async function (req, res) {	
	const user = JSON.parse(JSON.stringify(req.body)).userId; 

	var img = fs.readFileSync(req.file.destination+req.file.filename);
	var encode_img = img.toString('base64');
	const data = Buffer.from(encode_img,'base64');

	ProfileImg.findOneAndUpdate({ user: user}, { $set: { data: data, contentType: "jpg" }},{ upsert: true },
		function (err, response) {
			if (err) {
				console.log(err)
				return err;
			}
			return res.send({ message: response + "data updated!" });
		})

}
