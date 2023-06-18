const {validationResult} = require('express-validator');

module.exports = (request,response,next) => {
    let result = validationResult(request);
    if(result.errors.length != 0) {
        let errorContent = result.errors.reduce((current,object) => current+object.msg+", ","");
        let error = new Error(errorContent);
        error.status = 422;
        next(error);
    } else {
        next();
    }
}