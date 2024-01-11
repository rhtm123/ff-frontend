// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, removeCookie, getCookie } from '../utils/myCookie';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [authMember, setAuthMember] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if the authentication token exists in the cookie
    const storedToken = getCookie("token");
    const storedAuthMember = getCookie("authMember")
    // console.log(storedToken);
    // const storedMember = JSON.parse(getCookie("member"));

    if (storedToken && storedAuthMember) {
      console.log(storedToken, storedAuthMember)
      setToken(storedToken);
      setAuthMember(JSON.parse(storedAuthMember));
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount


  const login = (value) => {
    setToken(value.token);
    setAuthMember(value.member);
    setCookie("token",value.token);
    setCookie("authMember",JSON.stringify(value.member));
  };

  const logout = () => {
    setToken(null);
    removeCookie("token");
    
    router.push("/");
  };



  return (
    <AuthContext.Provider value={{ token, authMember, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
