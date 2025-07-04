// src/components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>PhotoShare</Link>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Feed</Link>

        {token
          ? <>
              <Link to="/upload" style={styles.link}>Upload</Link>
              <button onClick={handleLogout} style={styles.button}>
                Logout
              </button>
            </>
          : <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.link}>Register</Link>
            </>
        }
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    background: '#4CAF50',
    color: 'white',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'white',
    textDecoration: 'none'
  },
  links: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500'
  },
  button: {
    background: 'transparent',
    border: '1px solid white',
    color: 'white',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px'
  }
};