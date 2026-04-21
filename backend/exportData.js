require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');

const Url = require('./models/Url'); // adjust path if needed

mongoose.connect('mongodb://127.0.0.1:27017/urlShortenerDB')
.then(async () => {
    console.log("Connected to local MongoDB");

    const urls = await Url.find({});
    fs.writeFileSync('urls.json', JSON.stringify(urls, null, 2));
    console.log("Data exported to urls.json");
    process.exit(0);
})
.catch(err => console.error(err));