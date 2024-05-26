require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(
    process.env.DATABASE, // Use the environment variable for  database
    process.env.USER,     // Use the environment variable for  username
    process.env.PASSWORD, // Use the environment variable for password
    {
        host: process.env.HOST,      // Use the environment variable for host
        dialect: process.env.DIALECT || 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Add this option for database, as it uses SSL
            }
        }
    });

    

const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

testDbConnection();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model.js')(sequelize, Sequelize);  // user model
db.collector = require('./collector.model.js')(sequelize, Sequelize);   // collector model
db.order = require('./order.model.js')(sequelize, Sequelize);   // order model


db.card = require('./card.model.js')(sequelize, Sequelize); // create card 

db.order.belongsTo(db.user, { as: "user", foreignKey: "userId" });
 db.user.hasMany(db.order, { as: "orders", foreignKey: "userId" });

db.order.belongsTo(db.collector, { as: "collector", foreignKey: "collectorId" });
db.collector.hasMany(db.order, { as: "orders", foreignKey: "collectorId" });

module.exports = db;