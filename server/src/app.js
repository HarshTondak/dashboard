const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Data = require("./models/Data"); // Your Mongoose model

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to fetch data
app.get("/api/data", async (req, res) => {
  try {
    const data = await Data.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Connect DB and Start the server
mongoose.connect(process.env.DATABASE_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
