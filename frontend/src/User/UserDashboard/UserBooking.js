
import React, {  useState, useEffect } from 'react';

import {  useParams } from 'react-router-dom';
import './Mybooking.css'
import { PDFDocument, rgb } from 'pdf-lib';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { BASE_URL } from '../../components/URL';
import '../../components/Animation.css';
function Mybooking(props) {
    const [userData,setUserData]=useState(null);
    const [loading,setLoading]=useState(true);
const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [seatRow, setSeatRow] = useState('');
    const [seatCol, setSeatCol] = useState('');
    const [showTime, setShowTime] = useState('');
    
    const { movieName, moviePoster } = useParams();
    
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const [BookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]); // New state for current date
    
    useEffect(() => {
        async function fetchProfile() {
          try {
            const token = Cookies.get('token');
            
            if (!token) {
              return <Navigate to="/user/login" />; // Return the navigation component to redirect to the login page
            }
            
            const response = await fetch(`${BASE_URL}/profile`, {
              headers: {
                Authorization: token
              }
            });
    
            if (response.ok) {
              const data = await response.json();
              //console.log(data);
              setUserData(data.user);
              setName(data.user.name);
              setEmail(data.user.email);
              setPhoneNumber(data.user.phoneNumber.toString());
            } else {
              throw new Error('Failed to fetch profile');
            }
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        }
    
        fetchProfile();
      }, []);
    
      if (loading) {
        return <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
      }
      if (!userData) {
        return <Navigate to="/user/login" />; // Return the navigation component to redirect to the login page if there is an error or no user data
      }
     
    
    async function handleSubmit(e) {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('movieName',movieName);
        //formData.append('moviePoster',moviePoster);
        // console.log("User Data is  ",userData._id);
        // if (!name || !email || !phoneNumber || !seatRow || !seatCol || !showTime) {
        //     window.alert('Please fill in all fields');
        //     return;
        // }
        if (!name.trim() || !email.trim() || !phoneNumber.trim() || !seatRow.trim() || !seatCol.trim() || !showTime.trim()) {
            window.alert('Please fill in all fields');
            return;
        }
        let response = await fetch(`${ BASE_URL }/user-movie-booking`, {
            method: 'post',
            body: JSON.stringify({ name, email, phoneNumber, movieName,BookingDate, seatRow, seatCol, showTime ,BookingDate}),
            headers: {
                'Content-Type': 'application/json',
                Authorization: ` ${Cookies.get('token')}`
            },

        });
        // let response= await fetch(`http://localhost:5000/user-movie-booking/${userData._id}`,{
        //   method:'post',
        //   body:formData,


        // });
        if (response.ok) {
         
            setBookingSuccess(true);
        }
        let result = await response.json();
        // console.log(response);
        // console.log(result);
        // setUserData((prevUserData) => ({
        //     ...prevUserData,
        //     bookings: [...prevUserData.bookings, { name, email, phoneNumber,movieName,BookingDate, seatRow, seatCol,  showTime }],
        // }));

    }



    const handleDownloadTicket = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const font = await pdfDoc.embedFont('Helvetica');
        page.setFont(font);
        page.setFontSize(15);

        page.drawText('Booking Details:', { x: 150, y: 700, color: rgb(1, 0, 1), size: 18 });

        page.drawText(`Name: ${name}`, { x: 50, y: 650 });
        page.drawText(`Email: ${email}`, { x: 50, y: 600 });
        page.drawText(`Phone: ${phoneNumber}`, { x: 50, y: 550 });
        page.drawText(`Show Name: ${movieName}`, { x: 50, y: 500 });
        page.drawText(`Seat: Row ${seatRow}, Column ${seatCol}`, { x: 50, y: 450 });
       
        page.drawText(`Show Time:${BookingDate}, ${showTime}`, { x: 50, y: 400 });
        // Get current date and time
        const currentDate = new Date();
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const dateFormatted = currentDate.toLocaleString('en-US', options);

        page.drawText(`Print Date and Time: ${dateFormatted} ${currentDate.toLocaleTimeString()}`, { x: 50, y: 50, size: 5 });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'ticket.pdf';
        link.click();
    };

    return (

        <div className='form-booking-container'>
            <h2>{movieName}</h2>
            <img className='Booking-page-movie-poster' src={`${BASE_URL}/uploads/${moviePoster}`} alt={movieName} />
            {bookingSuccess ? (
                <div>
                    <p>Your booking was successful!</p>
                    <button onClick={handleDownloadTicket}>Download Ticket</button>
                </div>
            ) : (


                <form onSubmit={handleSubmit}>
                    <div className='form-booking-input'>
                        <label htmlFor='name'>Name: </label>
                        <input
                            id='name'
                            type='text'
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>
                    <div className='form-booking-input'>
                        <label htmlFor='email'>Email: </label>
                        <input
                            id='email'
                            type='text'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div className='form-booking-input'>
                        <label htmlFor='phoneNumber'>Phone : </label>
                        <input
                            id='phoneNumber'
                            type='text'
                            value={phoneNumber}
                            onChange={(e) => { setPhoneNumber(e.target.value.toString()) }}
                        />
                    </div>

                    <div className='form-booking-input-select'>
  <label htmlFor='date'>Select Date: </label>
  <input
    id='date'
    type='date'
    value={BookingDate}
    onChange={(e) => { setBookingDate(e.target.value) }}
  />
</div>
                    <div className='form-booking-input-select'>
                        <label htmlFor='Row'>Select Row: </label>
                        <select className='form-booking-input-select-option' id="Row" value={seatRow} onChange={(e) => { setSeatRow(e.target.value) }}>
                            <option value="">-- Select --</option>
                            <option value="R1">Row 1</option>
                            <option value="R2">Row 2</option>
                            <option value="R3">Row 3</option>
                        </select>
                    </div>
                    <div className='form-booking-input-select'>
                        <label htmlFor='Col'>Select Column: </label>
                        <select className='form-booking-input-select-option' id="Col" value={seatCol} onChange={(e) => { setSeatCol(e.target.value) }}>
                            <option value="">-- Select --</option>
                            <option value="C1">Col 1</option>
                            <option value="C2">Col 2</option>
                            <option value="C3">Col 3</option>
                        </select>
                    </div>
                    <div className='form-booking-input-select'>
                        <label htmlFor='ShowTime'>Show Time: </label>
                        <select className='form-booking-input-select-option' id="ShowTime" value={showTime} onChange={(e) => { setShowTime(e.target.value) }}>
                            <option value="">-- Select --</option>
                            <option value="7:30 PM">7:30 PM</option>
                            <option value="8:30 PM">8:30 PM</option>
                            <option value="10:30 PM">10:30 PM </option>
                        </select>
                    </div>
                    <div className='form-booking-buttn-container'>
                        <button className='form-booking-buttn' type='submit'>Submit</button>
                    </div>
                </form>
            )}
        </div>
    ) 
}

export default Mybooking;

