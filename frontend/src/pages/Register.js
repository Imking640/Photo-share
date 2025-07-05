import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import logo from './Logo.png';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigate('/posts');
    } catch {
      setError('Registration failed. Try again.');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
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

        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="register-input"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="register-input"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="register-input"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-button">Register</button>
        </form>

        {error && <p style={{ color: '#ed4956', marginTop: '10px' }}>{error}</p>}

        <div className="register-footer">
          Already have an account? <Link to="/">Log in</Link>
        </div>
      </div>
    </div>
  );
}