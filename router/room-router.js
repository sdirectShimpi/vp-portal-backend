const roomController = require('../controller/room-controller')
const express =require ('express')
const router=express.Router()

router.post('/sendChat',roomController.sendChat)
router.get('/receive',roomController.reciveTask)
module.exports= router