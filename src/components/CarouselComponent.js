import React from 'react';
import { Carousel } from 'react-bootstrap';

function CarouselComponent() {
  return (
    <Carousel interval={2000}>
      <Carousel.Item>
        <img
          style={{ height: '500px', objectFit: 'cover' }}
          className="d-block w-100"
          src="/image.png"
          alt="Life Insurance"
        />
        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <h3 style={{ color: '#fff' }}>Life Insurance</h3>
          <p style={{ color: '#fff' }}>Ensure the financial security of your loved ones with a life insurance policy.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          style={{ height: '500px', objectFit: 'cover' }}
          className="d-block w-100"
          src="/HealthInsurance.png"
          alt="Health Insurance"
        />
        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <h3 style={{ color: '#fff' }}>Health Insurance</h3>
          <p style={{ color: '#fff' }}>Protect yourself and your family with comprehensive health coverage.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          style={{ height: '500px', objectFit: 'cover' }}
          className="d-block w-100"
          src="/HomeIns.jpg"
          alt="Property & Casualty Insurance"
        />
        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <h3 style={{ color: '#fff' }}>Home Insurance</h3>
          <p style={{ color: '#fff' }}>Protect your assets from potential risks and damages.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
