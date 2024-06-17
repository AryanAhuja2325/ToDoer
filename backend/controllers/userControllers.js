const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/getAllUsers', async (req, res) => {
    const client = req.app.locals.client;

    try {
        const result = await client.query('SELECT * from users');
        res.status(200).json(result.rows)
    } catch (e) {
        console.error('Error executing query', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/login', async (req, res) => {
    const client = req.app.locals.client;
    const { username, password } = req.body;

    try {
        const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            res.status(404).json({ "Error": "User not found" });
        }
        const user = result.rows[0];

        if (bcrypt.compare(password, user.password)) {
            res.status(200).json(user);
        } else {
            res.status(400).json({ "Error": "Wrong password" })
        }
    } catch (e) {
        console.error('Error executing query', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/signup', async (req, res) => {
    const client = req.app.locals.client;
    const { username, email, password } = req.body;

    try {
        const userCheck = await client.query('SELECT * FROM users WHERE username = $1', [username]);

        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await client.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        const user = result.rows[0];

        res.status(200).json({ message: 'Signup successful' });
    } catch (e) {
        console.error('Error executing query', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;