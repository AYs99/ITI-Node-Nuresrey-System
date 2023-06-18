const {param,body} = require("express-validator");

exports.getById = [
    param("id").isMongoId().withMessage("id should be a mongo id")
]

exports.postTeacher = [
    // body("id").isMongoId().withMessage("enter a proper teacher id"),
    body("fullname").isAlpha('en-US', { ignore: ' ' }).withMessage("teacher name must be alphabetical"),
    body("password").isStrongPassword().withMessage("teacher password must be a strong password"),
    body("email").isEmail().withMessage("teacher email must be written properly"),
    body("image").isString().withMessage("teacher image must be a proper image url"),
]

exports.putTeacher = [
    body("id").isMongoId().withMessage("enter a proper teacher id"),
    body("fullname").optional().isAlpha('en-US', { ignore: ' ' }).withMessage("teacher name must be alphabetical"),
    body("password").optional().isStrongPassword().withMessage("teacher password must be a strong password"),
    body("email").optional().isEmail().withMessage("teacher email must be written properly"),
    body("image").optional().isString().withMessage("teacher image must be a proper image url"),
]

exports.deleteTeacher = [
    body("id").isMongoId().withMessage("teacher id must be a mongo object id"),
]