const express = require('express');
const app = express();
const cors = require('cors');

const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(cors());

app.listen(3000, () => {
    console.log('Application listening at port 3000');
});

app.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM example;');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/data/average', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT AVG(integer_field) as average FROM example');
        const average = parseFloat(result.rows[0].average);
        res.json({ average });
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching data from database');
    }
});

app.get('/data/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM example WHERE id = $1', [id]);
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching data from database');
    }
});
