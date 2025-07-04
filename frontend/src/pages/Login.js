import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Login.css';
import logo from './Logo.png'; 

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      login(res.data.token);
      navigate('/posts');
    } catch {
      setError('Invalid credentials. Try again.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img
  src={logo}
  alt="Instachat Logo"
  style={{
    width: '320px',
    border: 'none',
    background: 'transparent',
    boxShadow: 'none'
  }}
/>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email, phone or username"
            className="login-input"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-input"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button">Log In</button>
        </form>

        <div className="alt-login">Log in with Facebook</div>

        {error && <p style={{ color: '#ed4956', marginTop: '10px' }}>{error}</p>}

        <div className="footer-link">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
}