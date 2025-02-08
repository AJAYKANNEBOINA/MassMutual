import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Use this to access where the user wanted to go

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the saved user credentials from localStorage
    const savedUser = JSON.parse(localStorage.getItem('user'));

    // Check if the credentials match
    if (savedUser && savedUser.username === formData.username && savedUser.password === formData.password) {
       
      setError(''); // Reset any previous errors

      // Redirect to the intended page or fallback to the insurance-form page
      const redirectPath = location.state?.from || '/insurance-form';
      navigate(redirectPath);
    } else {
      setError('Invalid username or password!');
    }
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.container}>
        <div style={styles.LoginCard}>
          <h3 style={styles.heading}>Login</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>Username</label>
              <input
                type="text"
                name="username"
                placeholder='Enter your username'
                value={formData.username}
                onChange={handleChange}
                style={styles.input}
                required
                autoComplete="off" // Prevent autofill for username
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                placeholder='Enter your password'
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                required
                autoComplete="off" // Prevent autofill for password
              />
            </div>
            {error && <div style={styles.error}>{error}</div>}
            <button type="submit" style={styles.button}>Login</button>
            <p>Don't have an account? <a href="/signup">Signup</a> </p>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    height: '100vh',
    overflow: 'hidden',
    backgroundImage: `url('/MassMutual.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  },
  container: {
    display: 'grid',
    placeItems: 'center',
    height: '100%',
  },
  heading: {
    color: 'black',
    fontFamily: 'Arial, Helvetica, sans-serif',
    textAlign: 'center',
    marginBottom: '40px',
  },
  LoginCard: {
    backgroundColor: 'white',
    border: '1px solid white',
    borderRadius: '15px',
    boxShadow: '5px 5px 5px rgb(142, 137, 137)',
    textAlign: 'left',
    width: '400px',
    padding: '50px',
    alignItems: 'center',
    display: 'inline-block',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '8px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    backgroundColor: 'rgb(0, 46, 106)',
    color: 'white',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontWeight: '600',
    width: '100%',
    padding: '12px',
    borderRadius: '30px',
    marginTop: '18px',
    cursor: 'pointer',
    border: 'none',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
    textAlign: 'center',
    fontSize: '14px',
  },
};

export default Login;
