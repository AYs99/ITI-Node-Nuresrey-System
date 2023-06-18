const mongoose = require("mongoose");
require("../models/teacherModel");
require("../models/childModel")
require("../models/classModel");
const Teacher = mongoose.model("teachers");
const Children = mongoose.model("children");
const Classes = mongoose.model("classes");

exports.getClasses = (request,response,next) => {
    Classes.find()
    .then((data) => {
        response.status(200).json(data);
    })
    .catch(error => next(error))  
}

exports.getClassById = (request,response,next) => {
    Classes.findOne({_id:request.params.id})
    .then((data) => {
        if(data == null){
            throw new Error("This class doesn't exist");
        }
        response.status(200).json(data);
    })
    .catch(error => next(error))
}

exports.postClass = (request,response,next) => {
    let {name, supervisor, children} = request.body;
    let newClass = new Classes({
        // _id: id,
        name: name,
        supervisor: supervisor,
        children: children
    })

    // Teacher.findOne({_id:supervisor})
    // .then(data => {
    //     if(data == null){
    //         throw new Error("this teacher doesn't exist")
    //     }


    // })
    
    Children.find({_id:{$in:children}})
    .then(data => {
        if(data.length !== request.body.children.length){
            throw new Error("child/children don't exist")
        }

        newClass.save()
        .then(data => {
            response.status(201).json({"message":"class added successfully"});
        })
    })
    .catch(error => next(error))
}

exports.putClass = (request,response,next) => {
    Classes.updateOne({_id:request.body.id},request.body)
    .then(data => {
        if(data.matchedCount == 0){
            throw new Error("this class does not exist")
        }
        Teacher.findOne({_id:supervisor})
        .then(data => {
            if(data == null){
                throw new Error("this teacher does not exist")
            }

            Children.find({_id:{$in:children}})
            .then(data => {
                if(data.length !== request.body.children.length){
                    throw new Error("child/children don't exist")
                }

                response.status(200).json({"message":"class updated successfully"});
            })
        })
    })
    .catch(error => next(error))
}

exports.deleteClass = (request,response,next) => {
    Classes.deleteOne({_id:request.body.id})
    .then(data => {
        if(data.deletedCount == 0){
            throw new Error("This class doesn't exist");
        }
        response.status(200).json({"message":"class deleted successfully"});
    })
    .catch(error => next(error)) 
}

exports.getClassChildrenInfo = (request,response,next) => {
    Classes.aggregate([
        {
            $match:{_id: Number(request.params.id)}
        },
        {
            $lookup:{
                from:"children",
                localField:"children",
                foreignField:"_id",
                as:"childrenInfo"
            }
        },
        {
            $project:{
                children:"$childrenInfo"
            }
        }
    ])
    .then(data => {
        if(data.length == 0){
            throw new Error("this class does not exist")
        }
        response.status(200).json(data);
    })
    .catch(error => next(error))
}

exports.getClassSupervisor = (request,response,next) => {
    Classes.aggregate([
        {
            $match:{_id: Number(request.params.id)}
        },
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
        if(data.length == 0){
            throw new Error("this class has no supervisor")
        }
        response.status(200).json(data);
    })
    .catch(error => next(error))
}