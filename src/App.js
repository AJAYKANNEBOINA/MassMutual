import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import InlineBackgroundImage from './components/InlineBackgroundImage';
import CarouselComponent from './components/CarouselComponent';
import InsuranceForm from './components/InsuranceForm';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import InfoCard from './components/InfoCard';

function HomePage({ isLoggedIn }) {
  const navigate = useNavigate();


  return (
    <>
      <InlineBackgroundImage />
      <section style={styles.sectionSpacing}>
        <CarouselComponent />
      </section>
      <section style={styles.sectionSpacing}>
        <InfoCard />
      </section>
      <section style={styles.sectionSpacing}>
        {/* Additional content here if needed */}
      </section>
    </>
  );
}

function AppContent() {
  const location = useLocation();

  // Scroll to the top of the page whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={appWrapperStyles}>
      <Header />
      <main style={mainContentStyles}>
        <Routes>
          {/* Home Route - Displays InlineBackgroundImage, Carousel, and Insurance Selection Form */}
          <Route path="/" element={<HomePage isLoggedIn={false} />} /> {/* Set isLoggedIn as per your state management */}

          {/* Insurance Form Route */}
          <Route path="/insurance-form" element={<InsuranceForm />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Signup Route */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Define the styles for your main content
const appWrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const mainContentStyles = {
  flex: 1,
  paddingTop: 'calc(91px + 8px)', // Adjust this value based on your header's height + some spacing
  paddingLeft: '20px',
  paddingRight: '20px',
};

const styles = {
  mainContent: {
    padding: '20px',
  },
  sectionSpacing: {
    marginTop: '40px',
    marginBottom: '40px',
  },
};

export default App;
