const { where } = require('sequelize');
const validator = require('../config/validator')
const db = require('../models');
const Card = db.card;
const Order = db.order;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.createcard = async (req, res) => {
    try {
        const validationRules = {
            description: 'required',
            title: 'required|min:5|max:15',
            userName: 'required|max:6',
            email: 'required|email',
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
            Card.create({
                photo: req.file.path,
                description: req.body.description,
                title: req.body.title,
                userName: req.body.userName,
                email: req.body.email,
             }).then((card) => {
                res.status(200).send({
                    success: true,
                    message: "card created  successfully !",
                    data: card
                })
            }).catch((err) => {
                res.status(400).send({ error: err });
            });
        })

    } catch (error) {
        
        res.status(500).send({ success: false, message: error.message || "something went wrong" });
    }
}

exports.getCards = async (req, res) => {
    try {
        const cards = await Card.findAll();

        if (!cards.length) {
            return res.status(404).json({
                success: false,
                message: "No cards found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cards found successfully!",
            data: cards
        });
    } catch (error) {
        console.error("Error fetching cards:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching cards."
        });
    }
}

exports.updateCard = async (req, res) => {


    try {
        const { id } = req.params; // Assuming card id is passed in the URL params
        const { description } = req.body;

        console.log("id", id);
        console.log("description", description);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Card ID is required."
            });
        }

        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Description is required."
            });
        }

        const card = await Card.findByPk(id);

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Card not found."
            });
        }

        card.description = description; // Update description

        await card.save();

        return res.status(200).json({
            success: true,
            message: "Card description updated successfully!",
            data: card
        });
    } catch (error) {
        console.error("Error updating card description:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while updating card description."
        });
    }
}




