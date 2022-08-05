const EXPRESS = require('express')
const CORS = require('cors')
const USER=require('./routes/sresu')
const APP = EXPRESS()
APP.use(EXPRESS.json())
APP.use(CORS())
const DOTENV = require('dotenv')
DOTENV.config()


PORT = 8000

APP.use('/users',USER)

APP.listen(PORT, (req, res) => {
  console.log("server start " + PORT);
});


