const express = require('express')
const router = express.Router()
const projectPlanController = require('../controller/projectPlan-controller')
const ValidationMiddleware = require('../validater')



router.post('/addProjectPlan',   projectPlanController.AddprojectPlan)
router.get('/getProjectPlan',projectPlanController.GetProductPlanData)
router.get('/getProjectPlanId/:id', projectPlanController.GetProjectPlanById)
router.delete('/deleteRecord/:id',projectPlanController.DeleateProjectPlanRecord)
router.post('/updateRecord/:id',projectPlanController.UpadatProjectPlanData)

module.exports = router
