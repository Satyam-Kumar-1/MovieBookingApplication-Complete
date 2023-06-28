const express=require('express');
const router=express.Router();
const User=require('../../Database/RegistrationSchema');
const bcrypt=require('bcrypt');
router.post('', async (req, res) => {
  //console.log(req.body);
    try{
      const {name,email,phoneNumber,password}=req.body;
      
      let UserExists=await User.findOne({email});
      //console.log(UserExists);
      if(UserExists){
        return res.status(400).json({error:'Email Already Exist'});
      }
      const hashPasword=await bcrypt.hash(password,10);
      const newUser=new User({name,email,phoneNumber,password:hashPasword});
      const result=newUser.save();
      res.json(result);

    }catch(e){
      return res.status(500).json({error:'Server Error'});
    }
  })
  
 





// router.get('/',async (req,res)=>{
//   try{
//     const result=await User.deleteMany();
//   }catch(e){

//   }
// })
module.exports = router;
