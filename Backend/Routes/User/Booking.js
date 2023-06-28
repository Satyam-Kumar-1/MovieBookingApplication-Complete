const express=require('express');
const router=express.Router();

const User=require('../../Database/RegistrationSchema');
const {authMiddleware}=require('../../Middleware/AuthMiddleware');

//route for Booking 
router.post('/',authMiddleware, async (req, res) => {
   
  try {
    const  userId  = req.user.userId;
    // console.log(userId);
    // console.log(req.body);
    const bookingData = {
     
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      movieName: req.body.movieName, 
      BookingDate:req.body.BookingDate,
      seatRow: req.body.seatRow,
      seatCol: req.body.seatCol,
      showTime: req.body.showTime, 
      BookingDate:req.body.BookingDate
    };
    // console.log(userId);
    // console.log(bookingData);
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { bookings: bookingData } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});



module.exports=router;



