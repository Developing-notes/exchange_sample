const MONGOOSE = require('mongoose')
const DOTENV = require('dotenv')
DOTENV.config()

MONGOOSE.connect(process.env.MONGO_URL,(err,db)=>{
    if(err)throw err
    else{
        console.log('db connect')
    }
})
module.exports=MONGOOSE
