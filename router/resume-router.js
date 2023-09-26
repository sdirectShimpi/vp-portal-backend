const express  = require('express')
const router = express.Router()
const  resumeController= require('../controller/resume-controller')
const ValidationMiddleware = require('../validater')





router.post('/creatResuma', (req, res, next)=> ValidationMiddleware(req, res, next, 'addResuma'), resumeController.AddResume)
router.get('/getResuma',resumeController.GetResume)
router.get('/getUserDeatilsResuma',resumeController.GetResumeRrcord)
router.post('/updateResume/:id',resumeController.UpdateResume)
router.get('/getResumeDetails/:id',resumeController.GetResumeDetails)
router.delete('/deleteResume/:id',resumeController.DeleteResume)
module.exports = router

