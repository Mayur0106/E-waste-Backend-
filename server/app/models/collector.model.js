module.exports = (sequelize, Sequelize) => {
    const Collector = sequelize.define("collectors", {
        centerName: {
            type: Sequelize.STRING
        },
        contactPerson: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        district: {
            type: Sequelize.STRING
        },
        subDistrict: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        // operatingHours: {
        //     type: Sequelize.STRING
        // }
        timeFrom: {
            type: Sequelize.STRING
        },
        timeTo: {
            type: Sequelize.STRING
        },
        latitude: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.STRING
        },
        acceptedItems: {
            type: Sequelize.STRING
        },
        serviceOffered: {
            type: Sequelize.STRING
        },
        images: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return Collector;
};