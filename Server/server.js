const express = require('express');
const app = express();
const port = 3000;
const route = require('./routes')

const{startDB} = require('./db')

var cors = require('cors')

app.use(cors())

app.use('/', route)

  app.listen(port, () => {
    startDB()
    console.log(`🚀 server running on PORT: ${port}`);
  });

module.exports = app;
