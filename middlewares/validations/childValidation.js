const {param,body} = require("express-validator");

exports.postChild = [
    // body("id").isInt().withMessage("id should be integer"),
    body("fullname").isAlpha('en-US', { ignore: ' ' }).withMessage("child name must be alphabetical"),
    body("age").isInt().withMessage("age must be a number"),
    body("level").isIn(["PreKG", "KG1", "KG2"]).withMessage("child is either in PreKG, KG1, KG2"),
    body("address").isObject().withMessage("write proper address"),
    body("address.city").isAlpha('en-US', { ignore: ' ' }).withMessage("write a proper city name"),
    body("address.street").isAlphanumeric('en-US', { ignore: ' ' }).withMessage("write a proper street name"),
    body("address.building").isInt().withMessage("write a proper building name"),
]

exports.putChild = [
    body("id").isInt().withMessage("id should be integer"),
    body("fullname").optional().isAlpha('en-US', { ignore: ' ' }).withMessage("child name must be alphabetical"),
    body("age").optional().isInt().withMessage("age must be a number"),
    body("level").optional().isIn(["PreKG", "KG1", "KG2"]).withMessage("child is either in PreKG, KG1, KG2"),
    body("address").optional().isObject().withMessage("write proper address"),
    body("address.city").optional().isAlpha('en-US', { ignore: ' ' }).withMessage("write a proper city name"),
    body("address.street").optional().isAlphanumeric('en-US', { ignore: ' ' }).withMessage("write a proper street name"),
    body("address.building").optional().isInt().withMessage("write a proper building name"),
]

exports.deleteChild = [
    body("id").isInt().withMessage("teacher id must be a mongo object id"),
]

exports.getChildClassInfo = [
    param("id").isInt().withMessage("id should be integer")
]

exports.getChildById = [
    param("id").isInt().withMessage("id should be integer")
]