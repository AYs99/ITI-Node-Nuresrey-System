const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt")
require("../models/teacherModel");
const Teacher = mongoose.model("teachers");

exports.login=(request,response,next)=>{

    let token;

    Teacher.findOne({email:request.body.email})
    .then(data => {
        if(bcrypt.compareSync(request.body.password,data.password)){
            token=jwt.sign({
                id: data._id,
                role:'teacher',
            },process.env.tokenKey);
    
            response.status(200).json({data:"ok",token});
        } else {
            let error=new Error("not authenicated");
            error.status=401;
            next(error);
        }
    })


}