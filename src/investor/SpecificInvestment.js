import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SpecificInvestment = () => {
  const location = useLocation();

  // Sample state for individual investment data
  const [investmentData, setInvestmentData] = useState({
    category: '',
    propertyName: '',
    amountInvested: 0,
    profit: 0,
    totalReturns: 0,
    irr: 0,
    transactionHistory: [],
  });

  // Sample useEffect to simulate data fetching based on location.state
  useEffect(() => {
    // Replace this with your actual data-fetching logic using location.state
    // For now, it sets sample data
    const fetchData = async () => {
      // Simulate fetching data from location.state
      const data = location.state;
      // Update state with the fetched data
      setInvestmentData(data.information);
    };

    fetchData();
  }, [location.state]);

  return (
    <div className="container">
      {console.log(investmentData)}
      <h1 className="investment-title">{investmentData.propertyName} Details</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{investmentData.category} Investment Overview</h5>
          <p className="investment-details">
          Total Investment: ${investmentData.amountInvested}
            <br />
            Total Investment: ${investmentData.amountInvested}
            <br />
            Total Profit: ${investmentData.profit}
            <br />
            Total Returns: ${investmentData.totalReturns}
            <br />
            IRR: {investmentData.irr}%
          </p>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="mt-4">
        <h3>Transaction History</h3>
        <ul>
          {investmentData.transactionHistory.map((transaction, index) => (
            <li key={index}>
              Date: {transaction.transactionDate.toDateString()}, Amount: ${transaction.amount},{' '}
              {transaction.CorR === 'contribute' ? 'Contributed' : 'Received'},{' '}
              Ownership Percentage: {transaction.ownershipPercentage !== null ? transaction.ownershipPercentage + '%' : 'N/A'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpecificInvestment;
