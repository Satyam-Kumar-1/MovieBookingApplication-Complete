// import React, { createContext, useState } from 'react';

// // Create the UserContext
// export const UserContext = createContext();

// // Create the UserContextProvider component
// export const UserContextProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);
//   const [IsLogin,setIsLogin]=useState(false);
//   const [token,setToken]=useState();
//   const login = (user) => {
//     setUserData(user);
//     setIsLogin(true);
//     localStorage.setItem('authToken', token);
//     localStorage.setItem('userDatas', JSON.stringify(user));
//   };
//   function setTokenValue(token){
//       setToken(token);
//   }
//   const logout = () => {
//     setUserData(null);
//     setIsLogin(false);
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userDatas');
    
//     setUserData(null);
//   };

//   return (
//     <UserContext.Provider value={{ userData,setUserData, login, logout,IsLogin,token,setTokenValue }}>
//       {children}
//     </UserContext.Provider>
//   );
// };


// import React, { createContext, useState, useEffect } from 'react';

// // Create the UserContext
// export const UserContext = createContext();

// // Create the UserContextProvider component
// export const UserContextProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);
//   const [IsLogin, setIsLogin] = useState(false);
//   const [token, setToken] = useState();
// console.log('Login at UserContext ',IsLogin);
// console.log("userData at UserContext ",userData);
//   useEffect(() => {
//     const storedUserData = localStorage.getItem('userDatas');
//     const storedToken = localStorage.getItem('authToken');

//     if (storedUserData && storedToken) {
//       setUserData(JSON.parse(storedUserData));
//       setToken(storedToken);
//       setIsLogin(true);
//     }
//   }, []);

//   const login = (user) => {
//     setUserData(user);
//     setIsLogin(true);
//     localStorage.setItem('authToken', token);
//     localStorage.setItem('userDatas', JSON.stringify(user));
//     console.log("Login function:called    " ,login);
//   };

//   function setTokenValue(token) {
//     setToken(token);
//   }

//   const logout = () => {
//     setUserData(null);
//     setIsLogin(false);
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userDatas');
//     console.log("Logout Function Called ",logout);
//   };
  
  

//   return (
//     <UserContext.Provider value={{ userData, setUserData, login, logout, IsLogin, token, setTokenValue }}>
//       {children}
//     </UserContext.Provider>
//   );
// };



// import React, { createContext, useState, useEffect } from 'react';

// // Create the UserContext
// export const UserContext = createContext();

// // Create the UserContextProvider component
// export const UserContextProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);
//   const [IsLogin, setIsLogin] = useState(false);
//   const [token, setToken] = useState();

//   console.log('Login at UserContext ', IsLogin);

//   useEffect(() => {
//     const storedUserData = localStorage.getItem('userDatas');
//     const storedToken = localStorage.getItem('authToken');

//     if (storedUserData && storedToken) {
//       setUserData(JSON.parse(storedUserData));
//       setToken(storedToken);
//       setIsLogin(true);
//     }
//   }, []);

//   const login = (user) => {
//     setUserData(user);
//     setIsLogin(true);
//     localStorage.setItem('authToken', token);
//     localStorage.setItem('userDatas', JSON.stringify(user));
//     console.log('Login function called');
//   };

//   function setTokenValue(token) {
//     setToken(token);
//   }

//   const logout = () => {
//     setUserData(null);
//     setIsLogin(false);
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userDatas');
//     console.log('Logout Function Called');
//   };

//   return (
//     <UserContext.Provider value={{ userData, setUserData, login, logout, IsLogin, token, setTokenValue }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext
export const UserContext = createContext();

//Create the UserContextProvider component
export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem('userDatas');
    if (storedUserData) {
      //setIsLogin(true);
      return JSON.parse(storedUserData);
    }
    return null;
  });
  const [IsLogin, setIsLogin] = useState(!!userData);
  const [token, setToken] = useState();


  useEffect(() => {
    const storedUserData = localStorage.getItem('userDatas');
    const storedToken = localStorage.getItem('authToken');
    //console.log(storedUserData);
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setToken(storedToken);
      setIsLogin(true);
    }
  }, []);

  const login = (user) => {
    setUserData(user);
    setIsLogin(true);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userDatas', JSON.stringify(user));
  };

  function setTokenValue(token) {
    setToken(token);
  }

  const logout = () => {
    setUserData(null);
    setIsLogin(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDatas');
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, login, logout, IsLogin, token, setTokenValue }}>
      {children}
    </UserContext.Provider>
  );
};

