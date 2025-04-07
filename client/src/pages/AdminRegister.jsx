import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAdmin } from '../services/auth';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import './AdminRegister/AdminRegister.css';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await registerAdmin(formData);
      if (response.error) {
        setError(response.error);
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Admin <span className="text-gradient">Registration</span></h1>
          <p className="auth-subtitle">Create the first admin account for your URL shortener</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {error && <ErrorMessage message={error} />}
            {success && <div className="success-message">Registration successful! Redirecting to login...</div>}
            
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="username"
                autoFocus
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-block" 
              disabled={success}
            >
              {success ? (
                <LoadingSpinner size="small" color="light" />
              ) : (
                'Register Admin'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;