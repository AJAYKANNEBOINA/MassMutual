import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords don't match!");
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorMessage('Invalid email format!');
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      setErrorMessage('Phone number must be 10 digits!');
      return;
    }

    // Check if username already exists
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser && savedUser.username === formData.username) {
      setErrorMessage('Username already exists!');
      return;
    }

    // Save user credentials in localStorage
    localStorage.setItem(
      'user',
      JSON.stringify({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      })
    );

    setSuccessMessage('Signup Successful!');
    setErrorMessage('');
    setFormData({ username: '', password: '', confirmPassword: '', email: '', phoneNumber: '' });

    // Redirect to login page after a brief delay to show the success message
    setTimeout(() => {
      navigate('/login'); // Redirect to login
    }, 1500);
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.container}>
        <div style={styles.LoginCard}>
          <h2 style={styles.heading}>Signup</h2>
          {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
          {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>Username</label>
              <input
                type="text"
                name="username"
                placeholder='Username'
                value={formData.username}
                onChange={handleChange}
                style={styles.input}
                required
               autocomplete="off"
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
                autocomplete="off"
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="phoneNumber" style={styles.label}>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder='Phone Number'
                value={formData.phoneNumber}
                onChange={handleChange}
                style={styles.input}
                required
                autocomplete="off"
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder='Confirm Password'
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <button type="submit" style={styles.button}>Signup</button>
             

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
    marginBottom: '10px',
  },
  LoginCard: {
    marginTop:'10px',
    backgroundColor: 'white',
    border: '1px solid white',
    borderRadius: '15px',
    boxShadow: '5px 5px 5px rgb(142, 137, 137)',
    textAlign: 'left',
    width: '500px',
    padding: '50px',
    marginRight:'70px',
    alignItems: 'center',
    display: 'inline-block',
    fontFamily: 'Arial, Helvetica, sans-serif',
    marginBottom:'20px'
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
  errorMessage: {
    color: 'red',
    marginBottom: '15px',
    textAlign: 'center',
    fontSize: '14px',
  },
  successMessage: {
    color: 'green',
    marginBottom: '15px',
    textAlign: 'center',
    fontSize: '14px',
  },
};

export default Signup;
