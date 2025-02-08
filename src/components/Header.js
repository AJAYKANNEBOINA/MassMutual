import React from 'react';

function Header({ isLoggedIn, handleLogout }) {
  return (
    <header className="site-header" style={headerStyles}>
      <div className="container" style={containerStyles}>
        <div className="mm-r-logo-lg-white" role="img" aria-label="MassMutual Logo"></div>
        <a href="https://www.massmutual.com" className="navbar-brand">
          <img
            src="/mm2.png"
            alt="MassMutual Logo"
            style={{
              width: '190px',
              height: '70px',
              filter: 'brightness(1.0)',
              transition: 'transform 0.3s ease-in-out',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </a>
        <nav className="main-nav">
          <ul>
            <li><a href="/">For Individuals</a></li>
            <li><a href="/">For Businesses & Institutions</a></li>
            <li><a href="/">For Financial Professionals</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          {/* Conditional rendering based on login state */}
          {isLoggedIn ? (
            <>
              <span>Welcome, User!</span>
              <button className="btn btn-secondary" onClick={handleLogout}>Log Out</button>
            </>
          ) : (
            <>
              <a href="/login" className="btn btn-primary">Log In</a>
              <a href="/signup" className="btn btn-secondary">Sign Up</a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

// Styles for the sticky header
const headerStyles = {
  position: 'fixed', // Sticky/fixed positioning
  top: 0, // Stick to the top of the viewport
  left: 0,
  width: '100%', // Full width
  backgroundColor: '#002F6C', // Header background color
  zIndex: 1000, // Ensure it's above other elements
  padding: '10px 20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add a shadow for a raised effect
  color: '#fff',
};

const containerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};
 

export default Header;