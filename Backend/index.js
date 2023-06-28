

const express=require('express');
const app=express();
const cors=require('cors');
const PORT=process.env.PORT || 5000;
require('./Database/config');
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/register',require('./Routes/User/Regsiter'));
app.use('/login',require('./Routes/User/Login'));
app.use('/profile',require('./Routes/User/Profile'));
app.use('/Add-movies',require('./Routes/Admin'));
app.use('/movies',require('./Routes/MoviePoster'));
app.use('/user-movie-booking',require('./Routes/User/Booking'));

app.get('/', (req, res) => {
  res.send('Welcome to the website!');
});

app.listen(PORT,()=>{
  console.log(`App is running at ${PORT}`);
});
