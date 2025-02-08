import React from 'react';

const InfoCard = () => {
  const cardStyle = {
    backgroundColor: '#003375',
    borderRadius: '20px',
    padding: '20px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '550px',
    textAlign: 'center',
    margin: '10px',
    color: 'white'
  };

  const sectionStyle = {
    display: 'flex',
    padding: '20px',
  };

  const iconStyle = {
    fontSize: '30px',
    marginBottom: '15px',
  };

  const cardsData = [
    {
      icon: '🏥', 
      title: 'Health Insurance',
      description:
        'Comprehensive health coverage with access to the best hospitals and doctors nationwide.',
    },
    {
      icon: '🏠',
      title: 'Home Insurance',
      description:
        'Protect your home and valuables with our reliable home insurance plans.',
    },
    {
      icon: '🛡️',
      title: 'Life Insurance',
      description:
        'Secure your family’s future with our life insurance policies, offering coverage and peace of mind.',
    },
  ];

  return (
    <div style={sectionStyle}>
      {cardsData.map((card, index) => (
        <div key={index} style={cardStyle}>
          <div style={iconStyle}>{card.icon}</div>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
