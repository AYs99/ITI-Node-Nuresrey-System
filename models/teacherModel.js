const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    fullname:String,
    password:String,
    role:{type:String, default:'teacher'},
    email:{type:String, index:{unique:true}},
    image:String
})

mongoose.model("teachers",schema);