const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const route = require('./routes')

dotenv.config()
app.use(route)

let connectionStatus = 'disconnected';

const startDB = async () => {
  try{
    await  mongoose.connect(process.env.MONGO_URI)
    connectionStatus = "Successful"
  }catch(err){
    console.error("Failed to connect to DB")
    connectionStatus = "error";
  }
};

const stopDB = async () => {
  await mongoose.disconnect();
  connectionStatus = "closed"
}

app.get('/', (req, res) => {
  res.send(connectionStatus);
});

app.get('/ping', (req, res) => {
  res.send("pong");
});


  app.listen(port, () => {
    startDB()
    console.log(`🚀 server running on PORT: ${port}`);
  });


module.exports = app;
