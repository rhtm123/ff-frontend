// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, removeCookie, getCookie } from '../utils/myCookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if the authentication token exists in the cookie
    const storedToken = getCookie("token");
    console.log(storedToken);

    if (storedToken) {
      setToken(storedToken);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount


  const login = (newToken) => {
    setToken(newToken);
    setCookie("token",newToken);
  };

  const logout = () => {
    setToken(null);
    removeCookie("token");
  };



  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
