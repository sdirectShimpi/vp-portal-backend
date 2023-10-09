const mongoose =require('mongoose')
const product = new   mongoose.Schema({
    productName:{type:String,
    default:nulll
},
productPrice:{
    type:String,
    default:null,

},
proctutPrice:{
    type:String,
    default:null
},


})
module.exports= product
