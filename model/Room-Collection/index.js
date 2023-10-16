const mongoose = require ('mongoose')
const dbSchema = require('./dbschema')



module.exports = mongoose.model("room", dbSchema)