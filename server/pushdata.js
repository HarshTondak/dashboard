const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);

// Create a schema based on your JSON structure
const dataSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

const Data = mongoose.model("Data", dataSchema);

// Read the JSON file
const jsonData = JSON.parse(fs.readFileSync("./jsonData.json", "utf-8"));

// Insert the data into MongoDB
Data.insertMany(jsonData)
  .then(() => {
    console.log("Data uploaded successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error uploading data:", err);
    mongoose.connection.close();
  });
