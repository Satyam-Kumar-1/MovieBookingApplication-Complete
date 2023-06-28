import React ,{useEffect, useState}from 'react';

import './BookingHistory.css'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router';
import { BASE_URL } from '../../components/URL';
import { PDFDocument, rgb } from 'pdf-lib';
import '../../components/Animation.css';
function BookingHistory(props) {
   const [userData,setUserData]=useState(null);
   const [loading,setLoading]=useState(true);
   

   useEffect(()=>{
        async function fetchBookingDetails(){
            try{
                const token=Cookies.get('token');
                if(!token){
                    return <Navigate to='/user/login'></Navigate>
                   }
                
                   const response = await fetch(`${BASE_URL}/profile`, {
                    headers: {
                      Authorization: `${Cookies.get('token')}`
                    }
                  });
                //   console.log(response);
                if(response.ok){
                    const data=await response.json();
                    setUserData(data.user);
                }
                else{
                    console.log("Unable to fetch details");
                }
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchBookingDetails();
   },[]);
   async function handleDownload (item)  {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont('Helvetica');
    page.setFont(font);
    page.setFontSize(15);

    page.drawText('Booking Details:', { x: 150, y: 700, color: rgb(1, 0, 1), size: 18 });

    page.drawText(`Name: ${item.name}`, { x: 50, y: 650 });
    page.drawText(`Email: ${item.email}`, { x: 50, y: 600 });
    page.drawText(`Phone: ${item.phoneNumber}`, { x: 50, y: 550 });
    page.drawText(`Show Name: ${item.movieName}`, { x: 50, y: 500 });
    page.drawText(`Seat: Row ${item.seatRow}, Column ${item.seatCol}`, { x: 50, y: 450 });
   
    page.drawText(`Show Time:${item.BookingDate}, ${item.showTime}`, { x: 50, y: 400 });
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

   
    
   if(loading){
    return  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
}
if(!userData){
    return <Navigate to='/user/login'></Navigate>;
}
    
    return  (
        <div>
            <h1 className='booking-history-heading'>Booking History</h1>
            <table className='booking-history-table'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Movie Name</th>
                        <th>Show Date</th>
                        <th>Show Time</th>
                        <th>Seat Row</th>
                        <th>Seat Column</th>
                        <th></th>
                       
                        
                    </tr>
                </thead>
                <tbody>
                    {userData.bookings.map((item, index) => (
                        <tr key={index}>
                             <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.movieName}</td>
                            <td>{item.BookingDate}</td>
                            <td>{item.showTime}</td>
                            <td>{item.seatRow}</td>
                            <td>{item.seatCol}</td>
                            <td><button onClick={()=>{handleDownload(item)}}>download</button></td>
                            
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BookingHistory;