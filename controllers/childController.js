const mongoose = require("mongoose");
require("../models/childModel");
require("../models/classModel");
const Children = mongoose.model("children");
const Classes = mongoose.model("classes");

exports.getChildren = (request,response,next) => {
    Children.find()
    .then((data) => {
        response.status(200).json(data);
    })
    .catch(error => next(error))
}

exports.getChildById = (request,response,next) => {
    Children.findOne({_id:request.params.id})
    .then((data) => {
        if(data == null){
            throw new Error("This child doesn't exist");
        }
        response.status(200).json(data);
    })
    .catch(error => next(error))
}

exports.getChildClassInfo = (request,response,next) => {
    Classes.find({children:request.params.id})
    .then(data => {
        if(data.length == 0){
            throw new Error("this child is not in a class")
        }
        response.status(200).json(data);
    })
    .catch(error => next(error))
}

exports.postChild = (request,response,next) => {
    let {fullname, age, level, address} = request.body;
    let newChild = new Children({
        fullname: fullname,
        age: age,
        level: level,
        address: address
    })
    newChild.save()
    .then(data => {
        response.status(201).json({"message":"child added successfully"});
    })
    .catch(error => next(error))
}

exports.putChild = (request,response,next) => {
    Children.updateOne({_id: request.body.id},request.body)
    .then(data => {
        if(data.matchedCount == 0){
            throw new Error("child does not exist")
        }else if(data.modifiedCount == 0){
            throw new Error("inserted data is the same")
        }
        response.status(200).json({"message":"child updated successfully"})
    })
    .catch(error => next(error))
}

exports.deleteChild = (request,response,next) => {
    Children.deleteOne({_id:request.body.id})
    .then(data => {
        if(data.deletedCount == 0){
            throw new Error("This child doesn't exist");
        }
        Classes.updateOne({children:{$all:[request.body.id]}},{
            $pull:{children:request.body.id}
        })
        .then(data => {
            response.status(200).json({"message":"child deleted successfully"});
        })
    })
    .catch(error => next(error)) 
}