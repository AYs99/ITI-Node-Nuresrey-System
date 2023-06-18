const express = require('express');
const controller = require("../controllers/teacherController");
const validator = require("../middlewares/validations/validator");
const validation = require("../middlewares/validations/teacherValidation");
const auth = require("../middlewares/Auth/auth")
const router = express.Router();

router.route("/teachers")
    .get(auth.isTeacher,controller.getTeachers)

    .post(validation.postTeacher,
        validator,
        controller.postTeacher)

    .put(validation.putTeacher,
        validator,
        controller.putTeacher)

    .delete(validation.deleteTeacher,
        validator,
        controller.deleteTeacher) 
router.route("/teachers/supervise")
    .get(controller.getSupervisors) 
router.route("/teachers/:id")
    .get(validation.getById,
        validator,
        controller.getTeacherById)
module.exports = router;