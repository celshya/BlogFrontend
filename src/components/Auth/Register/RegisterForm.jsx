import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import{ API_BASE_URL} from '../../../config';

function Register() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password and confirm password don't match");
      return;
    }
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
      console.log('Registration response:', response.data);
      setIsLoading(false);
      navigate("/login")
      enqueueSnackbar('User registered successfully', { variant: 'success' });
   
    } catch (error) {
     
      setIsLoading(false);
      enqueueSnackbar('Error registering user', { variant: 'error' });
    }
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email address"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;
