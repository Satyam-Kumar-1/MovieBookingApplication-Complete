import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../components/URL';
import { Navigate } from 'react-router-dom';
import './Profile.css';
import '../../components/Animation.css';
function Profile(props) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Isedit,setEdit]=useState(false);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [phoneNumber,setPhoneNumber]=useState('');
  const [Address,setAddress]=useState();
  const [state,setState]=useState();
  const [district,setDistrict]=useState();
  const [pincode,setPinCode]=useState();
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
          // console.log(data);
          setUserData(data);
          setEmail(data.user.email);
          setName(data.user.name);
          setAddress(data.user.Address);
          setDistrict(data.user.district);
          setState(data.user.state);
          setPhoneNumber(data.user.phoneNumber);
          setPinCode(data.user.pincode);

        } else {
          throw new Error('Failed to fetch profile');
        }
      } catch (error) {
        console.log(error);
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

async function handleProfileEdit(){
  try{
    const response=await fetch(`${BASE_URL}/profile/update`,{
      method:'PUT',
      body:JSON.stringify({name,email,phoneNumber,Address,state,district,pincode}),
      headers:{
        'Content-Type':'application/json',
        Authorization:`${Cookies.get('token')}`
      }
    });
    if(response.ok){
      setEdit(false);
      setUserData((prevUserData) => ({
        ...prevUserData,
        user: {
          ...prevUserData.user,
          name,
          email,
          phoneNumber,
          Address,
          state,
          district,
          pincode,
        },
      }));
    }
    else{
      console.log("error in updating Data");
    }
  }catch(error){

  }
}

  return (
    <div className='profile-container'>
      {
        !Isedit?(
          <div>
      <h2 className='head-txt'>Welcome {userData.user.name} !</h2>
      <p className='user-data'>Name: {userData.user.name}</p>
      <p className='user-data'>Email: {userData.user.email}</p>
      <p className='user-data'>Mob: {userData.user.phoneNumber}</p>
      <p className='user-data'>Address: {userData.user.Address}</p>
      <p className='user-data'>State: {userData.user.state}</p>
      <p className='user-data'>District : {userData.user.district}</p>
      <p className='user-data'>Pin Code: {userData.user.pincode}</p>
      
      <button className='profile-button' onClick={()=>{setEdit(true)}}>Edit</button>
      </div>
        ):(
          <div>
            <div>
              <label htmlFor='name'>Name:</label>
              <input
                id='name'
                value={name}
                type='text'
                name='name'
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='email'>Email:</label>
              <input
                id='email'
                defaultValue={email}
                type='email'
                name='email'
                readOnly
                
              />
            </div>
            <div>
              <label htmlFor='phoneNumber'>Mob:</label>
              <input
                id='phoneNumber'
                value={phoneNumber}
                type='tel'
                name='phoneNumber'
                onChange={(e)=>{setPhoneNumber(e.target.value)}}
              />
            </div>
            <div>
              <label htmlFor='Address'>Address:</label>
              <input
                id='Address'
                value={Address}
                type='text'
                name='Address'
                onChange={(e)=>{setAddress(e.target.value)}}
              />
            </div>
            <div>
              <label htmlFor='state'>State:</label>
              <input
                id='state'
                value={state}
                type='text'
                name='state'
                onChange={(e)=>{setState(e.target.value)}}
              />
            </div>
            <div>
              <label htmlFor='district'>District:</label>
              <input
                id='district'
                value={district}
                type='text'
                name='district'
                onChange={(e)=>{setDistrict(e.target.value)}}
              />
            </div>
            <div>
              <label htmlFor='pinCode'>Pin Code:</label>
              <input
                id='pinCode'
                value={pincode}
                type='text'
                name='pincode'
                onChange={(e)=>{setPinCode(e.target.value)}}
              />
            </div>
            <button className='profile-button' onClick={handleProfileEdit}>Submit</button>

          </div>
        )
      }
    </div>
  );
}

export default Profile;
