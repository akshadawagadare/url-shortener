require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Url = require('./models/Url'); // adjust the path if needed

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB Atlas");

    // Read local JSON data
    const data = JSON.parse(fs.readFileSync('urls.json', 'utf-8'));

    // Insert data into Atlas
    await Url.insertMany(data);

    console.log("Data successfully imported to Atlas!");
    process.exit(0);
  })
  .catch(err => console.error("MongoDB connection error:", err));