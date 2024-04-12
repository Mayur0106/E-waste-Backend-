const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// client.verify.v2.services
//     .create({ friendlyName: 'ewaste project' })
//     .then(service => console.log(service.sid)
//         , (error) => {
//             console.log("Twillio Error", error)
//         });

// body {
//     "emailId" : "",
// }

exports.sendOtp = async (req, res) => {
    if (!req.body.emailId) {
        return res.status(400).send({ message: "EmailID is required" });
    }
    await client
        .verify
        .v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verifications
        .create({
            to: req.body.emailId,
            channel: "email"
        }).then((verification) => {
            res.status(200).send(verification.status);
        }, (error) => {
            res.status(404).send({ error: error, message: "problem in creating Twillio" })
        })
}


// body {
//     "emailId" : "",
//     "otp" : ""
// }
exports.checkOtp = async (req, res) => {
    await client
        .verify
        .v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks
        .create({
            to: req.body.emailId,
            code: req.body.otp
        }).then((verification_check) => {
            if (verification_check.status === "approved") {
                res.status(200).send(verification_check.status);
                console.log(verification_check.status);
            } else {
                res.status(400).send(verification_check.status);
                console.log(verification_check.status);
            }
        }, (error) => {
            res.status(404).send({ error: error, message: "problem in creating Twillio" })
        })
}