const jwt = require("jsonwebtoken");

const authGuard = (req,res,next)=>{

    const authHeaders = req.headers.authorization;

    if(!authHeaders){
        return res.status(401).json({error:"Authorization header not found"});
    }

    // BEarer 12313531
    const token = authHeaders.split(" ")[1];

    if(!token){
        return res.status(401).json({error:"No header token found!"});
    }
    
    try {
        const decodedUser = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decodedUser;
        next();
        
    } catch (error) {
        console.log(error); 
        res.json({error: "Invalid Token"});
    }

};

module.exports = authGuard;