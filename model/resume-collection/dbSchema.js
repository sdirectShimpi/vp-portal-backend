const mongoose = require('mongoose')
const  resumeSchema =  new mongoose.Schema({
    ResumeDoc:{
        type:String,
        default: null

    },
    Resumeof:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    
    isDeleted:{
            type:Boolean,
            default:false

        }
    },
    {timestamps:true}

)
module.exports = resumeSchema;