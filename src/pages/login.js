import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/router";

export default function Login() {
  const { token, login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(null); // New state for error message
  const [loading, setLoading] = useState(false); // New state for loading


// Handle changes in input fields

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    if (token) {
      router.push('/dashboard');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

 // let url = "https://flatfolio.onrender.com/api/members/login";

    let url = process.env.API_URL + "api/members/login";

     // Access the form data (username and password)
    // const { username, password } = formData;
    // Perform actions such as sending data to a server or authentication logic
    // console.log('Form Data:', { username, password });

    try {

      setLoading(true); // Start loading
      const response = await axios.post(url, formData);
      // Handle the response, e.g., update state or redirect to another page
      console.log('Login successful:', response.data);
      login(response.data);
      setErrorMessage(null); // Reset error message on successful login
    } catch (error) {
      console.error('Login error:', error.message);
      setErrorMessage('Wrong username or password'); // Set error message for wrong login details
    }
  finally {
    setLoading(false); // Stop loading, regardless of success or failure
  }
  };

// You can perform further actions like making an API request here
  return (
    <div className="hero min-h-screen bg-base-100 flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        {!token &&
          <form className="card-body text-center" onSubmit={handleSubmit}>
            <h1 className="text-5xl font-bold mb-6">Login</h1>
            {errorMessage && (
              <div className="text-red-500 mb-4">
                {errorMessage}
              </div>
            )}
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
                {loading ? 'Logging in...' : 'Login'}
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