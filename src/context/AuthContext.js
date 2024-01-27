// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, removeCookie, getCookie } from '../utils/myCookie';
import { useRouter } from 'next/router';

import { myFetch } from '@/utils/myFetch';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [authMember, setAuthMember] = useState(null);
  const [authSociety, setAuthSociety] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if the authentication token exists in the cookie
    const storedToken = getCookie("token");
    const storedAuthMember = getCookie("authMember");
    const authSociety = getCookie("authSociety");
    // console.log(storedToken);
    // const storedMember = JSON.parse(getCookie("member"));

    if (storedToken && storedAuthMember && authSociety) {
      // console.log(storedToken, storedAuthMember)
      setToken(storedToken);
      setAuthMember(JSON.parse(storedAuthMember));
      setAuthSociety(JSON.parse(authSociety));
    }

  }, []); // Empty dependency array ensures this effect runs only once on mount


  const login = async (value) => {
    setToken(value.token);
    setAuthMember(value.member);

    setCookie("token",value.token);
    setCookie("authMember",JSON.stringify(value.member));

    let societyId = value.member.societyId;
    let url = process.env.API_URL + "api/societies/"+ societyId;

    let data = await myFetch(url);
    console.log(data);
    setCookie("authSociety",JSON.stringify(data));
    setAuthSociety(data);
  };

  const logout = () => {
    setToken(null);
    setAuthMember(null);
    removeCookie("token");
    removeCookie("authMember")
    
    router.push("/");
  };



  return (
    <AuthContext.Provider value={{ token, authMember, authSociety, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
