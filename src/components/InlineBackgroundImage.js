import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function InlineBackgroundImage() {
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleCalculatePremium = () => {
    // Redirect to the InsuranceForm component
    navigate('/insurance-form');
  };

  return (
    <div
      style={{
        backgroundImage: `url('/Home.png')`,
        backgroundSize: 'cover', // Ensures the image covers the container
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '90vh',
        display: 'flex',
        justifyContent: 'flex-start', // Align content to the left
        alignItems: 'center',
        paddingLeft: '50px', // Adds padding on the left for spacing
        color: 'white',
        textAlign: 'left', // Left-align text
      }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '600px', // Restricts text container width for better readability on large screens
          padding: '20px',
          background: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
          borderRadius: '8px', // Rounded corners
          fontFamily: 'Montserrat, Helvetica, Arial, sans-serif', // Modern, clean font style
          color: '#ffffff', // Text color to stand out against the background
        }}
      >
        {/* Main Heading */}
        <h1
          style={{
            fontSize: '48px', // Larger size for main heading
            fontWeight: 'bold', // Bold weight for emphasis
            marginBottom: '10px', // Spacing below the heading
          }}
        >
          Plan today.
          <br/> Prosper tomorrow.
        </h1>

        {/* Subheading */}
        <div className="form-container" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <h1 className="form-heading">Insurance Premium Calculator</h1>
          <button
            type="button"
            className="card-body d-flex justify-content-center"
            style={{
              backgroundColor: '#ffffff',
              color: '#003375',
              border: 'none',
              padding: '10px 20px',
              fontSize: '1.2rem',
              borderRadius: '25px',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
            }}
             
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.transform = 'translateY(0)';
            }}
            onMouseDown={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.transform = 'translateY(1px)';
            }}
            onMouseUp={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.transform = 'translateY(-2px)';
            }}

            // Navigate to InsuranceForm on click
            onClick={handleCalculatePremium}
          >
            Calculate Premium
          </button>
        </div>
       
        
      </div>
      
    </div>
  );
}

export default InlineBackgroundImage;
