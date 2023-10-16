const mongoose = require('mongoose')
const projectPlan = new mongoose.Schema({
    projectPlan: {
        type: String,
        default: null
    },
releaseNotes: [
        {
            name:{
                type: String,
                default: null
            },
            doc:{
                type: String,
                default: null
            },
            reviewUrl:{
                type: String,
                default: null
            },
           }
],

projectDocument:[
    {
        type: String,
        default: null 
    }

],
    
addedBy:{
type: mongoose.Schema.Types.ObjectId,
ref: "user"
},

projectId:{
type: mongoose.Schema.Types.ObjectId,
ref: "project"

},



isDeleted: { 
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
module.exports = projectPlan
