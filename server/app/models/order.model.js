module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        product: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        accepted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        rejected: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return Order;
};