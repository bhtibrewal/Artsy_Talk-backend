const mongoose = require('mongoose');
require('dotenv').config();
const { DATABASE_URL } = process.env;

// mongodb
const connectToMongoDB = () => {
    mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}
module.exports = { connectToMongoDB }