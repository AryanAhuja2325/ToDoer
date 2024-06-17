const pg = require('pg');
const { Client } = pg;
const dotenv = require('dotenv');
const userController = require('./controllers/userControllers');
const express = require('express')
const cors = require('cors');

dotenv.config();
const client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: process.env.DATABASE,
});

client.connect()
    .then(() => {
        console.log('Connected to the database');

        const app = express();
        const port = process.env.APP_PORT || 8000;

        app.use(express.json());
        app.use(cors());

        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
        app.locals.client = client;

        app.use('/users', userController);
    })
    .catch(err => {
        console.log(err);
    });
