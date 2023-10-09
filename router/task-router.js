/*
 * @file: myTask.router.js
 * @description: It contain router layer for myTask management.
 */


const express = require("express");
const taskController = require ('../controller/task-controller')
const router = express.Router();



router.post("/addmyTask",  taskController.addmyTask);

router.get("/getmyTasks",  taskController.getmyTasks);

router.get("/getmyTaskDetails/:id",  taskController.getmyTaskDetails);

router.put('/updatemyTask/:id',  taskController.updatemyTask);

router.delete('/deletemyTask/:id' ,   taskController.deletemyTask);

module.exports = router;