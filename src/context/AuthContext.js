// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, removeCookie, getCookie } from '../utils/myCookie';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [member, setMember] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if the authentication token exists in the cookie
    const storedToken = getCookie("token");
    // console.log(storedToken);
    const storedMember = JSON.parse(getCookie("member"));

    if (storedToken) {
      setToken(storedToken);
      setMember(storedMember);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount


  const login = (value) => {
    setToken(value.token);
    setMember(value.member);
    setCookie("token",value.token);
    setCookie("member",JSON.stringify(value.member));
  };

  const logout = () => {
    setToken(null);
    removeCookie("token");
    router.push("/");
  };



  return (
    <AuthContext.Provider value={{ token, member, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
