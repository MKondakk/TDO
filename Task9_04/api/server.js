const express = require("express");
const { createClient } = require("redis");
const { Pool } = require("pg");

const redisClient = createClient( {url: 'redis://redis:6379' });

redisClient.on('error', err => console.log('Redis Client Error', err));

redisClient.connect().then(() => {
  console.log('Connected to Redis server');
}).catch(err => {
  console.error('Error connecting to Redis server:', err);
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const app = express();

app.use(express.json());

app.post("/message", async (req, res) => {
  try {
    const { message } = req.body;
    await redisClient.set('message', message);
    res.status(201).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/message", async (req, res) => {
  try {
    const message = await redisClient.get('message');
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const result = await pool.query(query);
    res.status(200).json({ users: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/user", async (req, res) => {
  try {
    const { username, email } = req.body;
    const query =
      "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *";
    const values = [username, email];
    const result = await pool.query(query, values);
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});