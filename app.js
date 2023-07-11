const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('dotenv').config(); // Load sensitive credentials from .env file.

// Starting the express server.
function startExpressServer() {
    const app = express();
    app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:4200', credentials: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    
    app.get('/', (req, res) => {
        res.json({ 'message': 'The backend system of CodeCooks works.' });
    });
    
    // Loading route handlers.

    // Listening request at port 4000.
    app.listen(process.env.SERVER_PORT ?? 4000, () => {
        console.log('The backend system of CodeCooks is ready.');
    });
}


// Activate the connection.
mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true
}).then(() => {
    startExpressServer();
}).catch(err => {
    console.error('An error occurred when establishing a connection to the database.');
    console.error(err);
});
