import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import "./LoginForm.css"
import{ API_BASE_URL} from '../../../config';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);

      if (response.status === 200) {
        enqueueSnackbar('User logged in successfully', { variant: 'success' });
        // Redirect to homepage or dashboard
        // Example: window.location.href = '/';
        navigate('/');
      }
    } catch (error) {
      enqueueSnackbar('Error logging in. Please try again.', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email address"
          className="form-input"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="form-input"
          required
        />
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <p>Don't have an account? <a href="/register">Sign Up</a></p>
    </div>
  );
}

export default Login;
