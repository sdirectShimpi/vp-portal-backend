const express = require('express')
const router = express.Router()
const projectController = require('../controller/project-controller')

router.post('/crateProduct', projectController.AddprojectData)
router.get('/getProjectData',projectController.GetProductData)
router.get('/getPorjectRecord/:id',projectController.GetProjectDetails)
router.delete('/deteteRecord/:id',projectController.DeleateRecord)
router.post('/updatedata/:id',projectController.UptadteData)


module.exports = router