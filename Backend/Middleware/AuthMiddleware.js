const jwt = require('jsonwebtoken');
const secretKey='SatyamKumar'


function authMiddleware(req,res,next){
    const token=req.header('Authorization');
    if(!token){
        return res.status(401).json({message:'No token'});
    }
    try{
         const decoded=jwt.verify(token,secretKey);
         //console.log("decoded data is ",decoded);
         req.user=decoded;
         next();
    }catch(err){

    }
}

module.exports = {authMiddleware};
