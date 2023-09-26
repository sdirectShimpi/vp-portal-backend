/*
 * @file: role.router.js
 * @description: It contain router layer for role management.
 */


const express = require("express");
const RoleController = require('../controller/role-controller')
const router = express.Router();



router.post("/addRole",  RoleController.addRole);

router.get("/getRoles",  RoleController.getRoles);

router.get("/getRoleDetails/:id",  RoleController.getRoleDetails);

router.put('/updateRole/:id',  RoleController.updateRole);

router.delete('/deleteRole/:id' ,   RoleController.deleteRole);

module.exports = router;