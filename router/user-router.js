/**
 * 
 */
const express = require('express')
const router = express.Router()
const userController = require('../controller/user-controller')
const {checkToken}   = require('../middleware/auth')
const ValidationMiddleware = require('../validater')



router.post('/creatUser', userController.AddUser)
router.post('/loginUser', (req, res, next)=> ValidationMiddleware(req, res, next, 'LogIn'),  userController.LoginUser)
router.get('/getUserRecord',userController.GetUserRecord)
router.get('/getUser/:id',userController.GetRecordDetails)
router.delete('/deletUserRecord/:id', checkToken, userController.DeleteUserDetials)
router.put('/updateUser/:id', userController.UpdateUser)
router.post('/verfyOtp', checkToken,userController.VerifyOtp)
router.post('/changePassword', (req, res, next) =>  ValidationMiddleware(req, res, next, 'changePassword'), userController.changePassword)
router.post('/resetPassword',  (req, res, next) => ValidationMiddleware(req, res, next, 'resetPassword'),  userController.ResetPassword)

module.exports = router


