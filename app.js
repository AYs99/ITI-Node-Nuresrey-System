require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const authenticationRouter = require("./routes/authenticationRouter");
const teacherRouter = require("./routes/teacherRouter");
const childRouter = require("./routes/childRouter");
const classRouter = require("./routes/classRouter");
const auth = require("./middlewares/Auth/auth");

const server = express();

let port = process.env.PORT || 8080;
mongoose.connect("mongodb://127.0.0.1:27017/nurserySystem")
        .then(() => {
            console.log("connected to database");
            server.listen(port,() => {
                console.log("listening",port);
            });
        })
        .catch(error => {console.log("problem in database"+error);})


//Cross-Origin Resource Sharing
server.use(cors())

// logging
server.use(morgan('tiny'));

//request content types
server.use(express.json());

//routes
server.get('/',(request,response,next) => {
    response.json({message:"This is the main page"});
});
server.use(authenticationRouter);
server.use(auth)
server.use(teacherRouter);
server.use(childRouter);
server.use(classRouter);

// not found
server.use((request,response,next) => {
    response.status(404).json({message:"Page Not Found"});
});

// error handling
server.use((error,request,response,next) => {
    response.status(500).json({message:error+""});
});