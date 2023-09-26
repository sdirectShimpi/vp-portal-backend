const mongoose = require('mongoose')
const dbSchema = require('./dbSchema')

module.exports=  mongoose.model('project',dbSchema)