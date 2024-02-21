// Setup
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// endpoint
let PORT = 9876;
app.listen(PORT, () => {
  console.log(`Server running on port, ${PORT}`);
});

// Connecting database
const dbConnectionString = process.env.Database_URL;
const db = new pg.Pool({ connectionString: dbConnectionString });

// create tables

// for runners enquiry form
app.get("/running-enquiry-form-table", async (req, res) => {
  const result = await db.query(`CREATE TABLE IF NOT EXISTS runners_enquiry (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        enquiry VARCHAR NOT NULL
    );`);
  res.json(result);
});

// for running course products from fake website
app.get("/running-training-programmes-table", async (req, res) => {
  const result =
    await db.query(`CREATE TABLE IF NOT EXISTS training_programmes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        duration VARCHAR(255) NOT NULL,
        weeklyCost VARCHAR(255) NOT NULL,
        totalCost INT
    );`);
  res.json(result);
});

app.get("/seed-running-training-programmes-table", async (req, res) => {
  const result =
    await db.query(`INSERT INTO training_programmes (name, duration, weeklyCost, totalCost) VALUES
    ('1500m', '6 Weeks', '£10 a week', 60),
    ('5km', '8 Weeks', '£10 a week', 80),
    ('10km', '10 Weeks', '£10 a week', 100),
    ('Half Marathon', '11 Weeks', '£15 a week', 165),
    ('Marathon', '12 Weeks', '£15 a week', 180),
    ('Ultra Marathon', '12 Weeks', '£20 a week', 240)
    ;`);
  res.json({ message: "seeded", result });
});
