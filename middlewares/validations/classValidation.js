const {param,body} = require("express-validator");

exports.postClass = [
    // body("id").isInt().withMessage("id should be integer"),
    body("name").isAlpha('en-US', { ignore: ' ' }).withMessage("class name must be alphabetical"),
    body("supervisor").isMongoId().withMessage("supervisor id must be mongo id object"),
    body("children").isArray().withMessage("children ids must be in an array")
                    .isInt().withMessage("children ids must be integer"),
]

exports.putClass = [
    body("id").isInt().withMessage("id should be integer"),
    body("name").optional().isAlpha('en-US', { ignore: ' ' }).withMessage("teacher name must be alphabetical"),
    body("supervisor").optional().isMongoId().withMessage("supervisor id must be mongo id object"),
    body("children").optional().isArray().withMessage("children ids must be in an array")
                    .isInt().withMessage("children ids must be integer"),
]

exports.deleteClass = [
    body("id").isInt().withMessage("id should be integer")
]

exports.getClassChildrenInfo = [
    param("id").isInt().withMessage("id should be integer")
]

exports.getClassSupervisor = [
    param("id").isInt().withMessage("id should be integer")
]

exports.getClassById = [
    param("id").isInt().withMessage("id should be integer")
]