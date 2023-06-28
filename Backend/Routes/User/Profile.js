const express=require('express');
const router=express.Router();
const {authMiddleware}=require('../../Middleware/AuthMiddleware');
const User=require('../../Database/RegistrationSchema');

router.get('/',authMiddleware, async (req,res)=>{
    try {
      const  userIDS  = req.user.userId;
        // Fetch user profile data
        const user = await User.findOne({_id:userIDS});
        //console.log("user : ",user);
        res.json({ user });
      } catch (error) {
        res.status(500).json({ error: 'Server Error' });
      }
    
});

router.put('/update',authMiddleware,async (req,res)=>{
  try{
    const  userId  = req.user.userId;
    const updatedData = req.body;
    // console.log("Updated data :  ",updatedData);
    // console.log("id ",userId);
    const updatedUser=await User.findOneAndUpdate(
      {_id:userId},
      updatedData,
      {new:true}
    );
    if(!updatedUser){
      return res.status(404).json({ error: 'User not found' });
      
    }
    res.json({updatedUser});
    // console.log(updatedUser);

  }catch(error){
    console.log(error);
    return res.status(500).json({ error: 'Server error' });
  }
})
module.exports=router;
