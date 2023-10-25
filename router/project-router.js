const express = require('express')
const router = express.Router()
const projectController = require('../controller/project-controller')
const {checkToken} = require('../middleware/auth')

router.post('/crateProduct', projectController.AddprojectData)
router.get("/getUserData", projectController.getUserData)
router.get('/getProjectData' ,projectController.GetProductData)
router.get('/getRecordById', projectController.GetRecordById)
router.get('/getPorjectRecord/:id',projectController.GetProjectDetails)
router.delete('/deteteRecord/:id',projectController.DeleateRecord)
router.post('/updatedata/:id',projectController.UptadteData)
router.patch('/updateStatus' , projectController.updateStatus)
router.get('/searchRecord' , projectController.searchUser)


module.exports = router