const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const Sequelize = require('sequelize');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const port = 3000;

// cors
var corsOptions = {
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200
}

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// serve static file from "Public" directory
app.use('/Public', express.static(path.join(__dirname, 'Public')));
// database
const db = require('./app/models');

db.sequelize.sync({
    // alter: true
}).then(() => {
    console.log('altered Database with { alter: true }');
});

// simple route
app.get('/', (req, res) => {
    res.send('welcome to e-waste management server! ');
});



// require('./app/routes/auth.routes')(app);

   require('./app/routes/collectorAuth.routes')(app);
 // require('./app/routes/forgetPassword.routes')(app);

// setting port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

async function test() {
    await db.collector.destroy({
        where: {
            id: { [Sequelize.Op.lt]: 7 }, // Use the "less than" operator
        },
        // truncate: false
    });
}

// test();