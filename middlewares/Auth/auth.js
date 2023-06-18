const jwt=require("jsonwebtoken");
module.exports=(request,response,next)=>{
    let token;
    try{
        token=  request.headers.token;
        let decodetdToken= jwt.verify(token,process.env.tokenKey);

        request.decodedObject=decodetdToken;
    
        next();
        

    }catch(error)
    {
        next(error);
    }
}


module.exports.isTeacher=(request,repsone,next)=>{

    if(request.decodedObject.role=="teacher")
    next()
    else
    {
        let error=new Error("not Authorized");
        error.status=403;
        next(error);
    }
}