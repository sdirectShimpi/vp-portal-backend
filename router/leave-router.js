
const express = require("express");
const LeaveController = require('../controller/leave-collection')
const router = express.Router();



router.post("/addLeave",  LeaveController.addLeave);

router.get("/getLeaves",  LeaveController.getLeaves);

router.get("/getLeaveDetails/:id",  LeaveController.getLeaveDetails);

router.put('/updateLeave/:id',  LeaveController.updateLeave);

router.delete('/deleteLeave/:id' ,   LeaveController.deleteLeave);

module.exports = router;