const express = require("express");
const DSRController = require('../controller/dsr-controller')
const router = express.Router();



router.post("/addDSR",  DSRController.addDSR);

router.get("/getDSR",  DSRController.getDSRDetails);




// router.get("/getRoleDetails/:id",  DSRController.getRoleDetails);

// router.put('/updateRole/:id',  DSRController.updateRole);

// router.delete('/deleteRole/:id' ,   DSRController.deleteRole);

module.exports = router;