const express=require('express');
const router=express.Router();
const Movie=require('../Movie')
router.get('/', async (req, res) => {
   
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error('Error retrieving movies:', error);
    res.status(500).json({ error: 'Failed to retrieve movies' });
  }
  
});
module.exports=router;