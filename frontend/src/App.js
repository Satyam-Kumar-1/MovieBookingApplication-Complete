// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './User/Registration/Login';
import Reg from './User/Registration/RegistrationForm';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Mybooking from './User/UserDashboard/UserBooking';
import Profile from './User/UserDashboard/Profile';

import { UserContextProvider } from './User/UserContext';
import AddMovie from './components/Admin/AddMovie';
import { Link } from 'react-router-dom';
import BookingHistory from './User/UserDashboard/BookingHistory';
import { UserContext } from './User/UserContext';
import { useContext } from 'react';
import Contact from './User/UserDashboard/Contact';
import TestProfile from './User/UserDashboard/TestProfile';
import LoadingPage from './components/LoadingPage';

function App() {

  return (
  
      <BrowserRouter>
      <Link to='/admin' > Admin</Link>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/registration" element={<Reg />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/booking" element={<BookingHistory/>} />
        <Route path="/booking/:movieName/:moviePoster" element={<Mybooking />} />
       
        <Route path='/add' element={<AddMovie/>}/>
        <Route path='/admin' element={<AddMovie/>}/>
        <Route path='/contact' element={<Contact/>}/>
        {/* <Route path='/animation' element={<LoadingPage/>}/> */}
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

