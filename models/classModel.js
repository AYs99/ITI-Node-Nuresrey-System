const mongoose = require("mongoose");

const autoIncrement = require('@alec016/mongoose-autoincrement');


const schema = new mongoose.Schema({
    _id: Number,
    name: String,
    supervisor: {type: mongoose.Types.ObjectId, ref:"teachers"},
    children: [{type: Number, ref: "children"}]
},{
    _id: false
})

autoIncrement.initialize(mongoose.connection);
schema.plugin(autoIncrement.plugin, {model: 'classes', field:'_id'});

mongoose.model("classes",schema);