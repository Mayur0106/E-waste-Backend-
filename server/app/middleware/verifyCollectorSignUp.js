const db = require("../models");
const Collector = db.collector;

checkDuplicateCenterName = (req, res, next) => {
    // Username
    Collector.findOne({
        where: {
            centerName: req.body.centerName
        }
    }).then(collector => {
        if (collector) {
            res.status(400).send({
                message: "Failed! Center name is already in use!"
            });
            return;
        }
        next();
    });
}

checkDuplicateEmail = (req, res, next) => {
    // Email
    Collector.findOne({
        where: {
            email: req.body.email
        }
    }).then(collector => {
        if (collector) {
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
    Collector.findOne({
        where: {
            phone: req.body.phone
        }
    }).then(collector => {
        if (collector) {
            res.status(400).send({
                message: "Failed! Phone is already in use!"
            });
            return;
        }
        next();
    });
}

const verifyCollectorSignUp = {
    checkDuplicateCenterName: checkDuplicateCenterName,
    checkDuplicateEmail: checkDuplicateEmail,
    checkDuplicatePhone: checkDuplicatePhone
};

module.exports = verifyCollectorSignUp;

