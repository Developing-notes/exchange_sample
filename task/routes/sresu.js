const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const { email, password, passwordConfirmPassword ,username, resultValidation }= require('../middlewares/srotadilav')
const USER=require('../helpers/sresu')
ROUTER.post('/register', email,password,resultValidation, USER.register )
ROUTER.post('/login', email,password,resultValidation, USER.login )
ROUTER.get('/logout', USER.verifyToken, USER.logout)
ROUTER.get('/get_details', USER.verifyToken, USER.getDetails)

module.exports = ROUTER;   