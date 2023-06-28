const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const User=require('../../Database/RegistrationSchema');
const secretKey='SatyamKumar'
router.post('/' ,async  (req,res)=>{
   try{
    const email=req.body.email;
    const password=req.body.password;
    // if(!email&&!password){
    //     return res.status(400).json({error:'email or Password Empty'});
    // }
    const user=await User.findOne({email});
   console.log(user);
    if(!user){
        return res.status(404).json({error:'User Not Found'});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(401).json({error:'Invalid Credentials '});
    }
    const token=jwt.sign({userId:user._id},secretKey,{expiresIn:'7d'});
    res.json({token:token});
    
   }catch(error){
    res.status(500).json({error:'Server Error'});
   }

});

module.exports=router;