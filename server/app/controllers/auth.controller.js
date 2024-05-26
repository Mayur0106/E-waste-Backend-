const validator = require('../config/validator')
const db = require('../models');
const User = db.user;
const Order = db.order;
const bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const validationRules = {
            fullName: 'required',
            userName: 'required',
            email: 'required|email',
            phone: 'required|numeric',
            state: 'required',
            district: 'required',
            subDistrict: 'required',
            city: 'required',
            password: 'required|min:6',
        };
        await validator(req.body, validationRules, {}, (error, status) => {
            if (!status) {
                return res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: error
                    });
            }
            User.create({
                profileImage: req.file.path,
                fullName: req.body.fullName,
                userName: req.body.userName,
                email: req.body.email,
                phone: req.body.phone,
                state: req.body.state,
                district: req.body.district,
                subDistrict: req.body.subDistrict,
                city: req.body.city,
                password: bcrypt.hashSync(req.body.password, 8),
            }).then((user) => {
                res.status(200).send({
                    success: true,
                    message: "User is registered successfully !",
                    data: user
                })
            }).catch((err) => {
                res.status(400).send({ error: err });
            });
        })

    } catch (error) {
        console.log("error in auth.controller.js :: signup() =>", error);
        res.status(500).send({ success: false, message: error.message || "something went wrong" });
    }
}

exports.signin = (req, res) => {
    try {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(async user => {
                if (!user) {
                    return res.status(404).send({ success: false, message: "user Not found." });
                }

                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );

                if (!passwordIsValid) {
                    return res.status(401).send({
                        success: false,
                        message: "Invalid Password!"
                    });
                }


                var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24 * 30 // 30 days
                });

                res.status(200).send({ success: true, message: "Login successfully.!", data: { token: token, user: user } })

            })
            .catch(err => {
                res.status(500).send({ success: false, message: err.message });
            });
    } catch (error) {
        console.log("error in auth.controller.js :: signin() =>", error);
        res.status(500).send({ success: false, message: error.message || "something went wrong" });
    }
}

exports.getProfile = (req, res) => {
    try {
        const userId = req.userId;

        User.findOne({
            where: {
                id: userId,
            }
        }).then((user) => {
            return res.status(200).send({ success: true, data: user });
        }).catch((err) => {
            return res.status(500).send({ sucess: true, message: err.message });
        })
    } catch (error) {
        console.log("error in auth.controller.js :: getProfile() => error");
        return res.status(500).send({ success: false, message: error.message || "something went wrong" })
    }
}

exports.changePassword = async (req, res) => {
    try {
        const validationRules = {
            newPassword: 'required|min:6',
        };

        await validator(req.body, validationRules, {}, async (error, status) => {
            if (!status) {
                return res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: error
                    });
            }

            const user = await User.findOne({ where: { email: req.body.email } });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "user not found."
                });
            }

            user.password = bcrypt.hashSync(req.body.newPassword, 8);
            user.save();

            return res.status(200).json({
                success: true,
                message: "Password changed successfully!"
            });
        });
    } catch (error) {
        console.log("error in auth.controller.js :: changePassword() => error");
        return res.status(500).send({ success: false, message: error.message || "something went wrong" })
    }
}

exports.createOrder = async (req, res) => {
    try {
        const validationRules = {
            product: 'required',
            description: 'required',
            quantity: 'required|numeric',
            collectorId: 'required|numeric',
        };

        await validator(req.body, validationRules, {}, async (error, status) => {
            if (!status) {
                return res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: error
                    });
            }

            const order = await db.order.create({
                product: req.body.product,
                description: req.body.description,
                quantity: req.body.quantity,
                userId: req.userId,
                collectorId: req.body.collectorId
            });

            return res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: order
            });
        });
    } catch (error) {
        console.log("error in auth.controller.js :: createOrder() => error");
        return res.status(500).send({ success: false, message: error.message || "something went wrong" })
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.userId },
            include: [{ model: db.collector, as: "collector" }],
            order: [['createdAt', 'DESC']]
        });

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "Orders not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Orders found successfully!",
            data: orders
        });
    } catch (error) {
        console.log("error in auth.controller.js :: getOrders() =>", error);
        res.status(500).send({ success: false, message: error.message || "something went wrong" });
    }
}