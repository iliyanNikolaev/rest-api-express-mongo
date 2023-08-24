const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('db connected');
    } catch (err) {
        console.log('DB NOT CONNECTED >>> ' + err.message);
        process.exit(1); // app will stop
    }
}

module.exports = connectToDB;