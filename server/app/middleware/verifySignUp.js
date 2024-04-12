const db = require("../models");
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            userName: req.body.userName
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
        next();
    });
}

checkDuplicateEmail = (req, res, next) => {
    // Email
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
    });
}

checkDuplicatePhone = (req, res, next) => {
    // Phone
    User.findOne({
        where: {
            phone: req.body.phone
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Phone is already in use!"
            });
            return;
        }
        next();
    });
}

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername,
    checkDuplicateEmail: checkDuplicateEmail,
    checkDuplicatePhone: checkDuplicatePhone
};

module.exports = verifySignUp;

