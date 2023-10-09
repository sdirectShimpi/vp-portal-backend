const mongoose = require("mongoose");
const myTask = new mongoose.Schema(
  {
    
 taskName: {
        type: String,
        default: false,
      },
taskDescription:{
  type: String,
  default: false,

},

taskList:{
  type: String,
  default: false,

},
taskList1:{
  type: String,
  default: false,

},
taskList2:{
  type: String,
  default: false,

},
assignDate:{
  type: Date,
     default: false,

},

    // myTask: [
     
    //   {
    //     _id: false, 
       
    //     taskName: {
    //       type: String,
    //       default: false,
    //     },

    //     taskStatus:{
    //         type: Boolean,
    //         default: false,  
    //     },
       
    //   },
    // ],

      taskOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
  
     
    // Date:{
    //     type: Date,
    //     default: false,  
    // },
    

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = myTask;
