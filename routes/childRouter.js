const express = require('express');
const controller = require("../controllers/childController");
const validator = require("../middlewares/validations/validator");
const validation = require("../middlewares/validations/childValidation");
const auth = require("../middlewares/Auth/auth");
const router = express.Router();

router.route("/child")
    .get(controller.getChildren)

    .post(validation.postChild,
        validator,
        controller.postChild)

    .put(validation.putChild,
        validator,
        controller.putChild)

    .delete(validation.deleteChild,
        validator,
        controller.deleteChild)

router.route("/child/:id/class")
    .get(validation.getChildClassInfo,
        validator,
        controller.getChildClassInfo)
        
router.route("/child/:id")
    .get(validation.getChildById,
        validator,
        controller.getChildById)
module.exports = router;