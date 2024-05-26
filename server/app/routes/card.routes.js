const API_CONTEXT = process.env.API_CONTEXT || '/api';
const controller = require("../controllers/card.controller");
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
            callback(null, './Public/CardImages')
        },
        filename: (req, file, callback) => {
            
            callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}` )
        }
    })

    const upload = multer({
        storage: storage,
        limits: { fieldSize: 40 * 1024 * 1024 }
    })  

    app.post(
        API_CONTEXT + "/auth/createCard",
        upload.single('photo'),
        [
        ],
        controller.createcard
    );

    app.put(
        API_CONTEXT + "/auth/updateCard/:id",
        controller.updateCard
    );

     app.get(
        API_CONTEXT + "/auth/getCard",
        controller.getCards
    );
    
}


