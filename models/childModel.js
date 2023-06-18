const mongoose = require("mongoose");

const autoIncrement = require('@alec016/mongoose-autoincrement');


const typeAddress = new mongoose.Schema({
    city: {type: String, required: true},
    street: {type: Number, required: true},
    building: {type: Number, required: true},
},{
    _id: false
})

const schema = new mongoose.Schema({
    _id: Number,
    fullname: String,
    age: Number,
    level: String,
    address: {type: typeAddress}
},{
    _id: false
})

autoIncrement.initialize(mongoose.connection);
schema.plugin(autoIncrement.plugin, {model: 'children', field:'_id'});

mongoose.model("children",schema);