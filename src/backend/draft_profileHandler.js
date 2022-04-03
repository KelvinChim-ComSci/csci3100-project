var mongoose = require('mongoose');

var ProfileImgSchema = new mongoose.Schema({
	//user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	profileImg:
	{
		data: Buffer,
		contentType: String,
		//type:String
	}
});

var ProfileImg = mongoose.model('ProfileImg', ProfileImgSchema);



//Image is a model which has a schema imageSchema
{/*
module.exports.profileImgRetrieve = async function (req, res) {
    ProfileImg.findOne({user:req.params.userId}) //req.params.userId 
	.then((data) => {
		console.log('data');
		res.json(data);
	})
	.catch((error) => {
		console.log('error: ', error);
	});
}


// the POST handler for processing the uploaded file


module.exports.profileImgPost = async function (req, res) {	
    
	var img = fs.readFileSync(req.file.path);
	console.log("zzz");
	console.log(img);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image: new Buffer(encode_img,'base64') //image:new Buffer(encode_img,'base64')
    };
	console.log(final_img.contentType)
		console.log(final_img.image) //

		ProfileImg.create(final_img,function(err,result){
			if(err){
				console.log(err);
			}else{
				console.log(result.img.Buffer);
				console.log("Saved To database");
				res.contentType(final_img.contentType);
				res.send(final_img.image); //
			}
		})
}


module.exports.profileImgPost = async function (req, res) {	
	console.log(req.protocol);
	console.log(req.get('host'));
	console.log(req.file.filename)

	const url = req.protocol + '://' + req.get('host')
    const user = new ProfileImg({
       // _id: new mongoose.Types.ObjectId(),
      //  name: req.body.name,
        profileImg: url + '/public/' + req.file.filename
    });
    user.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
              //  _id: result._id,
                profileImg: result.profileImg
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })

}
*/}

module.exports.profileImgRetrieve = async function (req, res) {
	
	ProfileImg.findOne({}) //.findOne({ user: req.body.userId}) // req.params.userId 
        .then((data) => {
            console.log('dat');
			res.json({
                pics: data.profileImg  //.toString('base64') //注意這裡將圖片decode
            });
            //res.json(data.profileImg.toString('base64')); //data.profileImg.toString('base64')
        })
        .catch((error) => {
            console.log('error: ', error);
        });
}



{/*
//work but wrong
module.exports.profileImgPost = async function (req, res) {	

	console.log(req.body.path);
	console.log(req.body.profileImg);
	console.log(req.protocol);
	//console.log(req.protocol + '://' + req.get('host')+ '/public/' + req.file.filename);
	console.log(req.body.filename);
	
	const url = req.protocol + '://' + req.get('host')

	const user = new ProfileImg({
		// _id: new mongoose.Types.ObjectId(),
	   //  name: req.body.name,
		 profileImg: url + '/public/' + req.body.filename
	 });
	 user.save().then(result => {
		 res.status(201).json({
			 message: "User registered successfully!",
			 userCreated: {
			   //  _id: result._id,
				 profileImg: result.profileImg
			 }
		 })
	 }).catch(err => {
		 console.log(err),
			 res.status(500).json({
				 error: err
			 });
	 })
 
}

*/}

module.exports.profileImgPost = async function (req, res) {	
	console.log(req.file);
	console.log("ABC");
	//var img = fs.readFileSync(req.file.path);
	 /* console.log(new Buffer(req.body.profileImg.toString('base64')));
	//console.log(new Buffer(this.state.profileImg).toString('base64'));
	var encode_img = req.body.profileImg.toString('base64');
	var final_img = {
        contentType:"req.file.mimetype",
        data:new Buffer(encode_img,'base64')
    };
   
    
    ProfileImg.create(final_img,function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result.profileImg.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    })
   */

}
