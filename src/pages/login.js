import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

import { getAuthCookie } from '@/utils/myCookie';


export default function Login() {
  const {token, login, logout} = useAuth();

  // const storedToken = getAuthCookie();
  // console.log(storedToken);
  // State to keep track of input values
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // let url = "https://flatfolio.onrender.com/api/members/login";

    let url = process.env.API_URL + "api/members/login"
    // Access the form data (username and password)
    // const { username, password } = formData;
    // Perform actions such as sending data to a server or authentication logic
    // console.log('Form Data:', { username, password });

    try {
      // console.log("fdfas")
      const response = await axios.post(url, formData);

      // Handle the response, e.g., update state or redirect to another page
      console.log('Login successful:', response.data);
      login(response.data.token);
    } catch (error) {
      // Handle error, e.g., display an error message
      console.error('Login error:', error.message);
    }


    // You can perform further actions like making an API request here
  };

  return (
    <div className="hero min-h-screen bg-base-100 flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        {!token && 
        <form className="card-body text-center" onSubmit={handleSubmit}>
          <h1 className="text-5xl font-bold mb-6">Login</h1>
          {/* {token} */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        }

        {token && <div>
          <h1>You are already logged in</h1>
          </div>} 
      </div>
    </div>
  );
}
