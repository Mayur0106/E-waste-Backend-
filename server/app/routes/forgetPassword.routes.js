const API_CONTEXT = process.env.API_CONTEXT || '/api';
const controller = require("../controllers/verifyEmail.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // body {
    //     "emailID" : "",
    // }

    app.post(
        API_CONTEXT + "/verifyEmail/sendOtp",
        controller.sendOtp
    );

    // body {
    //     "emailID" : "",
    //     "otp" : ""
    // }


    app.post(
        API_CONTEXT + "/verifyEmail/checkOtp",
        controller.checkOtp
    );
}