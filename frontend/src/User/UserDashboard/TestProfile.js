import React, { useEffect } from 'react';
import { BASE_URL } from '../../components/URL';
import Cookies from 'js-cookie';

function TestProfile(props) {
  useEffect(() => {
    async function fetchProfile()  {
        try {
            const response = await fetch(`${BASE_URL}/profile`, {
              headers: {
                Authorization: ` ${Cookies.get('token')}` // Include the token in the request headers
              }
            });
    
            if (response.ok) {
              const data = await response.json();
              console.log(data);
            } else {
              throw new Error('Failed to fetch profile');
            }
          } catch (error) {
            console.error(error);
          }
    }
     
    

    fetchProfile();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      profile page
    </div>
  );
}

export default TestProfile;
