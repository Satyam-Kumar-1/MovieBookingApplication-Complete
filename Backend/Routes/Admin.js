const express=require('express');
const router=express.Router();
const multer=require('multer');
const Movie=require('../Movie');
const path=require('path')
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const filename = uniqueSuffix + extension;
    cb(null, filename);
  }
});

const upload = multer({ storage });
router.post('/', upload.single('moviePoster'), async (req, res) => {
  const { movieName } = req.body;
  const moviePoster = req.file.filename;
  //console.log(req.body);

  try {
    const newMovie = new Movie({ movieName, moviePoster });
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error('Error saving movie:', error);
    res.status(500).json({ error: 'Failed to save movie' });
  }
});

module.exports=router;