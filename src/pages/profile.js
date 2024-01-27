// ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from "next/link";
import { getCookie } from "../utils/myCookie";
import { useRouter } from 'next/router';
import { myFetch } from '@/utils/myFetch';

const ProfilePage = () => {
  const [societie, setSocietie] = useState([]);
  const router = useRouter();
  const { authMember, token } = useAuth();
//   console.log("authmember is:" + authMember);

  useEffect(() => {
    if (authMember){
        fetchData();
    }
  }, [authMember]);

  React.useEffect(() => {
    // console.log("token", token);
     const token = getCookie("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  const fetchData = async () => {
    try {
        let data = await myFetch(`${process.env.API_URL}api/societies/${authMember?.societyId}`);

        setSocietie(data);
       // console.log(data);
    //   const response = await axios.get('https://flatfolio.onrender.com/api/societies');
    //   setSocieties(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
        <div className="text-sm px-8 breadcrumbs">
        <ul>
          <li><Link href="/dashboard">Dashboard</Link></li> 
          <li>Profile</li>
        </ul>
      </div>
      <h2 className="text-2xl font-bold mb-4">Profile Page</h2>
      {Object.keys(societie).length > 0 ? (
        <div className="bg-white p-8 rounded shadow">
          <p className="text-lg font-semibold mb-2">Name: {societie.name}</p>
          <p className="text-gray-600 mb-2">Builder ID: {societie.builderId}</p>
          <p className="text-gray-600 mb-2">Formation Date: {new Date(societie.formationDate).toLocaleDateString()}</p>
          <p className="text-gray-600 mb-2">Registration Number: {societie.registrationNumber}</p>
          {/* ... Display other properties as needed */}
          <p className="text-gray-600 mb-2">Address: {societie.address.address1}, {societie.address.address2}, {societie.address.city}, {societie.address.state} - {societie.address.pin}</p>
        </div>
      ) : (
        <p className="text-red-500">No data available</p>
      )}
      </div>
  );
};

export default ProfilePage;
