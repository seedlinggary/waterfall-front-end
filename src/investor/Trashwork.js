import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const HomePage = () => {
  // Sample investment data
  const investments = [
    { category: 'Stocks', amountInvested: 500000, profit: 100000 },
    { category: 'Real Estate', amountInvested: 300000, profit: 50000 },
    { category: 'Businesses', amountInvested: 200000, profit: 30000 },
  ];

  // Extract category names, investment, and profit data
  const categories = investments.map((investment) => investment.category);
  const investedAmounts = investments.map((investment) => investment.amountInvested);
  const profits = investments.map((investment) => investment.profit);

  // Calculate total investment and total profit
  const totalInvestment = investedAmounts.reduce((total, amount) => total + amount, 0);
  const totalProfit = profits.reduce((total, profit) => total + profit, 0);

  // Calculate IRR and ROI
  const calculateIRR = () => {
    // Implement your IRR calculation logic here
    // Replace the following with your actual IRR calculation
    return 0.1; // Sample IRR value (e.g., 10%)
  };

  const calculateROI = () => {
    // Implement your ROI calculation logic here
    // Replace the following with your actual ROI calculation
    return (totalProfit / totalInvestment) * 100; // Sample ROI calculation (as a percentage)
  };

  const chartRef = useRef(null);

  useEffect(() => {
    let myChart;

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        myChart = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: chartOptions,
        });
      }
    }

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, []);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Invested Amount',
        data: investedAmounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Profit',
        data: profits,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
        ticks: {
          display: false, // Hide default chart.js labels
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
    },
  };

  return (
    <div className="container">
      <h1 className="dashboard-title">Welcome to Your Investment Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Portfolio Value</h5>
              <p className="card-text total-portfolio-value">${totalInvestment + totalProfit}</p>
              <Link to="/sub-investments" className="btn btn-primary">
                View Sub-Investments
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Investment Overview</h5>
              <p className="investment-overview">
                Total Investment: ${totalInvestment}
                <br />
                Total Profit: ${totalProfit}
                <br />
                IRR: {calculateIRR()}%
                <br />
                ROI: {calculateROI()}%
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="legend-container">
          {categories.map((category) => (
            <div key={category} className="legend-item">
              <Link to={`/category/${category}`}>
                {category}
              </Link>
            </div>
          ))}
        </div>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default HomePage;
