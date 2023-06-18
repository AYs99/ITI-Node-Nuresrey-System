const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("../models/teacherModel");
require("../models/classModel");
const Teacher = mongoose.model("teachers");
const Classes = mongoose.model("classes");

exports.getTeachers = (request,response,next) => {
    Teacher.find()
    .then((data) => {
        response.status(200).json(data);
    })
    .catch(error => next(error))  
}

exports.getTeacherById = (request,response,next) => {
    Teacher.findOne({_id:request.params.id})
    .then((data) => {
        if(data == null){
            throw new Error("This teacher doesn't exist");
        }
        response.status(200).json(data);
    })
    .catch(error => next(error))    
}

exports.postTeacher = (request,response,next) => {
    let {fullname,password,email,image} = request.body;

    let newTeacher = new Teacher({
        fullname:fullname,
        password:bcrypt.hashSync(password, 10),
        email:email,
        image:image
    })

    newTeacher.save()
    .then((data) => {
        response.status(201).json({"message":"teacher added successfully"});
    })
    .catch(error => next(error))
}

exports.putTeacher = (request,response,next) => {
    Teacher.updateOne({_id:request.body.id},request.body)
    .then(data => {
        if(data.modifiedCount == 0){
            throw new Error("This teacher doesn't exist");
        }
        response.status(200).json({"message":"teacher updated successfully"})
    })
    .catch(error => next(error))
}

exports.deleteTeacher = (request,response,next) => {
    Teacher.deleteOne({_id:request.body.id})
    .then(data => {
        if(data.deletedCount == 0){
            throw new Error("This teacher doesn't exist");
        }
        Classes.updateOne({supervisor:request.body.id},{$unset:{supervisor:""}})
        .then((data) => {
            response.status(200).json({"message":"teacher deleted successfully"});
        })
    })
    .catch(error => next(error))   
}

exports.getSupervisors = (request,response,next) => {
    Classes.aggregate([
        {
            $lookup:{
                from:"teachers",
                localField:"supervisor",
                foreignField:"_id",
                as:"supervisorInfo"
            }
        },
        {
            $unwind:{path:"$supervisorInfo"}
        },
        {
            $project:{
                supervisor:"$supervisorInfo"
            }
        }
    ])
    .then(data => {
        response.status(200).json(data)
    })
    .catch(error => next(error))
}