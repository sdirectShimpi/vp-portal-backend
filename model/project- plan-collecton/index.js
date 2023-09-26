const mongoose = require('mongoose')
const dbSchema = require('./dbScheema')
module.exports=  mongoose.model('projectPlan'
, dbSchema)


