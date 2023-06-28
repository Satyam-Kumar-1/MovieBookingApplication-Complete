
 
import React, { useEffect, useState } from 'react';
import './Login.css';


import { Navigate } from 'react-router';
import { BASE_URL } from '../../components/URL';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
function Login(props) {
    // const { login } = useContext(UserContext);
    // const {setTokenValue}=useContext(UserContext);
   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const Navigate=useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      Navigate('/');
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    let response = await fetch(`${BASE_URL}/login`, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let result = await response.json();
    console.log(result);
    if (response.ok) {
     
      Cookies.set('token',result.token,{expires:7});
      window.location.reload(); // Refresh the page
      Navigate('/');
    } else {
      window.alert(result.error);
    }
  }

  return (
    <div>
      <div className='Login-Heading'>
        <h2>Sign In</h2>
      </div>
      <form onSubmit={handleLogin} className='Login-form'>
        <div>
          <label htmlFor='email' className='form-login-input'>
            Email
          </label>
          <input
            name='email'
            id='email'
            type='email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className='form-input'>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            id='password'
            type='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <button type='submit' className='btn-login'>
            Log In
          </button>
        </div>
      </form>

     
    </div>
  );
}

export default Login;
