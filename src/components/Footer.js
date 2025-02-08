import React from 'react';

function Footer() {
  return (
    <footer>
      {/* Main Footer Content (Accounts, Company, Solutions) with blue background */}
      <div
        style={{
          fontFamily: '"Lato", Helvetica, Arial, sans-serif',
          fontSize: '1.6rem',
          fontWeight: '400',
          lineHeight: '1.5',
          color: '#007bff',
          textAlign: 'left',
          boxSizing: 'border-box',
          width: '100%', // Set width to 100% for better responsiveness
          paddingRight: '0rem',
          paddingLeft: '0rem',
          maxWidth: '1470px', // Adjust max width to match login card
          paddingTop: '1.8rem',
          
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          borderRadius: '15px', // Border radius for consistent styling
          boxShadow: '5px 5px 5px rgb(142, 137, 137)', // Same shadow effect
          padding: '50px', // Consistent padding as the LoginCard
          margin: '0 auto', // Centered margin
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap', // Allows wrapping of columns on smaller screens
          }}
        >
          <div className="footer-column" style={columnStyle}>
            <h4 style={headerStyle}>Accounts</h4>
            <ul style={listStyle}>
              <li><h5><a href="#" style={linkStyle}>Mobile App</a></h5></li>
              <li><h5><a href="#" style={linkStyle}>Login</a></h5></li>
              <li><h5><a href="#" style={linkStyle}>Sign Up</a></h5></li>
              <li><h5><a href="#" style={linkStyle}>Digital Access</a></h5></li>
            </ul>
          </div>
          <div className="footer-column" style={columnStyle}>
            <h4 style={headerStyle}>Company</h4>
            <ul style={listStyle}>
              <li><h5><a href="#" style={linkStyle}>About Us</a></h5></li>
              <li><h5><a href="#" style={linkStyle}>Newsroom</a></h5></li>
              <li><h5><a href="#" style={linkStyle}>Sustainability</a></h5></li>
            </ul>
          </div>
          <div className="footer-column" style={columnStyle}>
            <h4 style={headerStyle}>Solutions</h4>
            <ul style={listStyle}>
              <li><h5><a href="#" style={linkStyle}>For Individuals</a></h5></li>
              <li><h5><a href="#" style={linkStyle}>For Employers</a></h5></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal and Copyright Section */}
      <div
        className="mm-footer-legal"
        style={{
          marginTop: '2rem',
          backgroundColor: 'rgb(255, 255, 255)', // White background for the legal section
          padding: '1rem 0',
          textAlign: 'center', // Center-align for cleaner layout
          fontFamily: 'Arial, Helvetica, sans-serif', // Consistent font
          fontSize: '14px', // Slightly smaller text for legal details
          color: '#333333', // Dark text color for readability
        }}
      >
        {/* Logo Section */}
        <div className="row" style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
          <div className="col-12" style={{ marginBottom: '1rem' }}>
            <img
              src="/mm4.png" // Ensure this points to the correct logo file
              alt="MassMutual Logo"
              style={{ width: '150px', height: 'auto' }} // Resize logo appropriately
            />
          </div>

          {/* Legal and Copyright Info */}
          <div className="col-12" style={{ marginBottom: '1rem' }}>
            <p>©2024 Massachusetts Mutual Life Insurance Company (MassMutual®), Springfield, MA 01111-0001. All rights reserved.</p>
          </div>

          {/* Links Section */}
          <div className="col-12">
            <ul style={legalLinksStyle}>
              <li><a href="https://www.massmutual.com/sitemap" rel="noopener noreferer" target="_self" style={linkStyle}>Sitemap</a></li>
              <li><a href="https://www.massmutual.com/legal/terms-of-use" rel="noopener noreferer" target="_self" style={linkStyle}>Terms of Use</a></li>
              <li><a href="https://www.massmutual.com/protecting-your-information" rel="noopener noreferer" target="_self" style={linkStyle}>Privacy</a></li>
            </ul>
            <p style={{ marginTop: '1rem', color: '#666666' }}>MM202707-309750</p>
          </div>

          {/* California Consumer Privacy Act Section */}
          <div className="col-12">
            <p style={{ color: '#007bff' }}>
              <a href="https://www.massmutual.com/legal/california-consumer-privacy-act" target="_self" rel="noopener noreferer" style={linkStyle}>
                California Do Not Sell or Share My Personal Information
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Define shared styles to make it easier to manage
const columnStyle = {
  marginBottom: '2rem',
  flex: '1 1 30%',
  minWidth: '250px', // Ensure the columns don't shrink too much on smaller screens
};

const headerStyle = {
  marginBottom: '1rem',
  color: '#004db2',
  fontWeight: '700',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
};

const linkStyle = {
  color: '#007bff',
  textDecoration: 'none',
};

const legalLinksStyle = {
  listStyleType: 'none',
  padding: 0,
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
};

export default Footer;
