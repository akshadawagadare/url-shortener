const express = require("express");
const { nanoid } = require("nanoid");
const validUrl = require("valid-url");
const Url = require("../models/url");

const router = express.Router();

/*
 POST /shorten
 Create a short URL
*/
router.post("/shorten", async (req, res) => {
  try {

    const { originalUrl, expiresInDays } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "URL is required" });
    }

    if (!validUrl.isUri(originalUrl)) {
      return res.status(400).json({ message: "Invalid URL" });
    }

    // Check if URL lready exists
    const existingUrl = await Url.findOne({ originalUrl });

    if (existingUrl) {
      return res.json({
        shortUrl: `http://localhost:5000/${existingUrl.shortCode}`
      });
    }

    const shortCode = nanoid(5);

    let expiresAt = null;

    // Set expiration date
    if (expiresInDays) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expiresInDays);
    }

    const newUrl = new Url({
      originalUrl,
      shortCode,
      expiresAt
    });

    await newUrl.save();

    res.json({
      shortUrl: `http://localhost:5000/${shortCode}`,
      expiresAt
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


/*
 GET /analytics/:shortCode
 Get analytics for a short URL
*/
router.get("/analytics/:shortCode", async (req, res) => {
  try {

    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      clicks: url.clicks,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


/*
 GET /:shortCode
 Redirect to original URL
*/
router.get("/:shortCode", async (req, res) => {
  try {

    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Check if link expired
    if (url.expiresAt && url.expiresAt < Date.now()) {
      return res.status(410).json({ message: "Link expired" });
    }

    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;