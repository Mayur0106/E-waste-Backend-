module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("cards", {
        photo: {
            type: Sequelize.STRING
        },
        userName: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT // Change the data type to TEXT
        },
        email: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
    });

    return Card;
};
