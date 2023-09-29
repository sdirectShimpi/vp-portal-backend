const mongoose = require('mongoose')
const dbSchema = require('./db-schema')
module.exports=  mongoose.model('leave'
, dbSchema)