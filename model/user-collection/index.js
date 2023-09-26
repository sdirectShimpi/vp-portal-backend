/**
 * 
 */
const mongoose = require ('mongoose')
const dbSchema = require('./dbSchema')



module.exports = mongoose.model("user", dbSchema)
