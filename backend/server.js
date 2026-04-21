require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const urlRoutes = require("./routes/urlRoutes");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); 

/* RATE LIMITER */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

/* DATABASE CONNECTION */
mongoose.connect(process.env.MONGO_URI) // ← just pass the URI
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

/* ROUTES */
app.use("/", urlRoutes);

app.get("/", (req, res) => {
  res.send("URL Shortener API is running");
});

/* START SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});