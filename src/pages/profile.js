// ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from "next/link";
import { getCookie } from "../utils/myCookie";
import { useRouter } from 'next/router';

const ProfilePage = () => {

  const router = useRouter();
  const { authMember, token, authSociety } = useAuth();


  React.useEffect(() => {
    // console.log("token", token);
     const token = getCookie("token");

    if (!token) {
      router.push("/login");
    }
  }, []);



  return (
    <div className="mx-auto">
        <div className="text-sm px-8 breadcrumbs">
        <ul>
          <li><Link href="/dashboard">Dashboard</Link></li> 
          <li>Profile</li>
        </ul>
      </div>
      <div className='px-8 py-8'>

        <div className="card rounded bg-base-300">
          <div className='card-body'>
          <p className="text-lg font-semibold mb-2">Name: {authSociety?.name}</p>
          <p className="mb-2">Builder ID: {authSociety?.builderId}</p>
          <p className="mb-2">Formation Date: {new Date(authSociety?.formationDate).toLocaleDateString()}</p>
          <p className="mb-2">Registration Number: {authSociety?.registrationNumber}</p>
          {/* ... Display other properties as needed */}
          <p className="mb-2">Address: {authSociety?.address.address1}, {authSociety?.address.address2}, {authSociety?.address.city}, {authSociety?.address.state} - {authSociety?.address.pin}</p>
        </div>
        </div>
        <br /> <br />
      
      </div>
      </div>
  );
};

export default ProfilePage;
