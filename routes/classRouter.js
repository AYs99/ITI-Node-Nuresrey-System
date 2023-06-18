const express = require('express');
const controller = require("../controllers/classController");
const validator = require("../middlewares/validations/validator");
const validation = require("../middlewares/validations/classValidation");
const router = express.Router();

router.route("/class")
    .get(controller.getClasses)

    .post(validation.postClass,
        validator,
        controller.postClass)

    .put(validation.putClass,
        validator,
        controller.putClass)

    .delete(validation.deleteClass,
        validator,
        controller.deleteClass) 

router.route("/class/:id/child")
    .get(validation.getClassChildrenInfo,
        validator,
        controller.getClassChildrenInfo) 
router.route("/class/:id/teacher")
    .get(validation.getClassSupervisor,
        validator,
        controller.getClassSupervisor)
router.route("/class/:id")
    .get(validation.getClassById,
        validator,
        controller.getClassById)
module.exports = router;