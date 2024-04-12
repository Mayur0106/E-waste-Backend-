const API_CONTEXT = process.env.API_CONTEXT || '/api';
const controller = require("../controllers/auth.controller");
const { verifySignUp, authJWT } = require("../middleware");
const multer = require('multer');
const path = require('path');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './Public')
        },
        filename: (req, file, callback) => {
            callback(null, Date.now() + path.extname(file.originalname))
        }
    })

    const upload = multer({
        storage: storage,
        limits: { fieldSize: 40 * 1024 * 1024 }
    })

    app.post(
        API_CONTEXT + "/auth/signup",
        upload.single('photo'),
        [
            // verifySignUp.checkDuplicateUsername,
            // verifySignUp.checkDuplicateEmail,
            // verifySignUp.checkDuplicatePhone
        ],
        controller.signup
    );

    app.post(
        API_CONTEXT + "/auth/signin",
        controller.signin
    );

    app.get(
        API_CONTEXT + "/auth/getProfile",
        [authJWT.verifyToken],
        controller.getProfile
    )

    app.post(
        API_CONTEXT + "/auth/updatePassword",
        controller.changePassword
    );

    app.post(
        API_CONTEXT + "/auth/createOrder",
        [authJWT.verifyToken],
        controller.createOrder
    );

    app.post(
        API_CONTEXT + "/auth/getOrders",
        [authJWT.verifyToken],
        controller.getOrders
    );
    
}