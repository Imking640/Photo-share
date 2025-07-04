// src/pages/Register.js
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      setMessage('✅ Registered successfully!');
    } catch (err) {
      setMessage('❌ Registration failed. Try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            style={styles.input}
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            style={styles.input}
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    background: 'linear-gradient(135deg, #ece9e6, #ffffff)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    width: '300px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '10px',
    marginTop: '12px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '15px',
  },
  message: {
    marginTop: '15px',
    textAlign: 'center',
    fontWeight: '500',
    color: '#555',
  },
};