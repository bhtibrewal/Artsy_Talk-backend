const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.DATABASE_URL);

// mongoose.connect(process.env.DATABASE_URL)
//     .then(() => console.log(' Connected to database'))
//     .catch(err => console.error(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log('server running'));    

module.export = app;