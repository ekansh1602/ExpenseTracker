import React from 'react';

const isIncome = Math.round(Math.random());

const InfoCard = () => {
  return (
    <div elevation={3} style={{ textAlign: 'center', padding: '0 10%' }}>
      Example For Voice Search ⬇ <br /> 
      Add {isIncome ? 'Income ' : 'Expense '} 
      for {isIncome ? '₹100 ' : '₹500 '}  
      in Category {isIncome ? 'Buisness ' : 'Travel '}
      for {isIncome ? 'Monday ' : 'Friday '}
    </div>
  );
};

export default InfoCard;