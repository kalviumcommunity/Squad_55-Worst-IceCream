const mongoose = require('mongoose');
require('dotenv').config();

let connectionStatus = 'disconnected';

const startDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000 
          });
        connectionStatus = "Successful";
    } catch (err) {
        console.error("Failed to connect to DB");
        connectionStatus = "error";
    }
};  

const stopDB = async () => {
    await mongoose.disconnect();
    connectionStatus = "closed";
};

const getStatus = async () => {
    return JSON.stringify(connectionStatus);
};

module.exports = {startDB, stopDB, getStatus };