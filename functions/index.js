const functions = require('firebase-functions');
const cors = require("cors")({
	origin: true
})
const nodemailer = require("nodemailer")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendmail = functions.https.onRequest(function(req, res) {
	return cors(req, res, function() {
		let transporter = nodemailer.createTransport({
			host: "smtp.mailgun.org",
			port: 587,
			secure: false,
			auth: {
				user: "dit brugernavn",
				pass: "dit password"
			}
		})
		
		transporter.verify(function(error, success) {
			if (error) {
				console.log(error)
				res.send("error")
				return
			}
			let mailOptions = {
				to: "be@rts.dk",
				from: req.body.email,
				subject: "Besked fra hjemmesiden",
				text: req.body.message
			}
			
			transporter.sendMail(mailOptions,
				function(error, info) {
					if (error) {
						console.log(error)
						res.send("error")
						return
					}
					console.log(info)
					res.send("ok")
			})
		})
	})
})
