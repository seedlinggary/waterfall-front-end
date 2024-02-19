import React, { useEffect, useRef, useState } from 'react';
import { Bar, getElementsAtEvent } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, Link, useLocation  } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import {reactLocalStorage} from 'reactjs-localstorage';
import useFetch from '../useFetch';
import apiRequest from '../ApiRequest'


const ChartHome = () => {
  // Sample investment data
  const location = useLocation()
  const [dealInvestments, setDealInvestments] = useState()
  const [totalInvested, setTotalInvested] = useState(0)
  const [totalReturned, setTotalReturneds] = useState(0)
  const [investments, setInvestments] = useState([])

  const [categories, setcategories] = useState([])
  const [investedAmounts, setinvestedAmounts] = useState([])
  const [profits, setprofits] = useState([])
  const [totalInvestment, settotalInvestment] = useState([])
  const [totalProfit, settotalProfit] = useState(30)


//   const categories = investments.map((investment) => investment.category);
//   const investedAmounts = investments.map((investment) => investment.amountInvested);
//   const profits = investments.map((investment) => investment.profit);

//   // Calculate total investment and total profit
//   const totalInvestment = investedAmounts.reduce((total, amount) => total + amount, 0);
//   const totalProfit = profits.reduce((total, profit) => total + profit, 0);

  const investmentSrate = location.state 
  const mystyle = {
      color: "white",
      backgroundColor: "#f4f4f4",
      padding: "10px",
    };

          
    let cookie = reactLocalStorage.get('cookie')
    const requestOptions = {
        method: 'GET',
        headers: { 
        'x-access-token': cookie},
    };

  //   const { data: deals, error, isPending} = useFetch(`/deal/${company.id}` , requestOptions)


  const navigate = useNavigate();
//   function handleClick(path) {
//       navigate(path);
//     }
    function GetOrginizedInvestments(investmentSrate) {
      let ogranizedByDeal = {}
      let total_invested = 0
      let total_returned = 0
      investmentSrate.map((investment, i) => {
          // !("key" in obj)
          // if (!ogranizedByDeal[investment.distribution.del_id]){
            if (investment.distribution){
              if (!(investment.distribution.deal_id in ogranizedByDeal)){

              ogranizedByDeal[investment.distribution.deal_id] = [investment]
          }else {
              ogranizedByDeal[investment.distribution.deal_id].push(investment)
          }
          total_invested += investment.distribution.total_value
          investment.distribution.profits.map((profit, i) => {
              total_returned += profit.payed_distributions
          })
        }
      })
      // let  investTotal = investment.distribution.total_value +
    //   console.log(ogranizedByDeal)
      setDealInvestments(ogranizedByDeal)
      setTotalReturneds(total_returned)
      setTotalInvested(total_invested)

    }
      


    useEffect(() => {
        if (investmentSrate){
            GetOrginizedInvestments(investmentSrate)
        }
      }, []);

      useEffect(() => {
        // console.log(dealInvestments)
        if (dealInvestments){
            let local_investments = []
            Object.entries(dealInvestments).map( ([deal_id, deal],i) => { 
                let total_value = 0
                let total_profits = 0
                let unsortedTransactionHistory = []
                 deal.map((investment, i) => {
                     console.log(investment.distribution)
                     total_value += investment.distribution.total_value 
                     {investment.distribution.profits && investment.distribution.profits.map((profit, i) => {
                         total_profits += profit.payed_distributions 
                         console.log(profit)
                         unsortedTransactionHistory.push({amount: profit.payed_distributions, transactionDate: new Date(profit.distribution_date), CorR: 'recieve', ownershipPercentage: profit.percentage_ownership })
                        })}
                        unsortedTransactionHistory.push({amount: investment.distribution.total_value, transactionDate: new Date(investment.distribution.date_funds_recieved), CorR: 'contribute', ownershipPercentage: null })
    
                        })
                const compareDatetime = (a, b) => {
                    return new Date(a.transactionDate) - new Date(b.transactionDate);
                    };
                
                    // Sort the array based on the datetime property
                const transactionHistory = [...unsortedTransactionHistory].sort(compareDatetime);
                        
                // let transactionHistory = []
                console.log(transactionHistory)
                let localDeal = {category : deal[0].distribution.deal.name, amountInvested: total_value, profit: total_profits, transactionHistory}
                local_investments.push(localDeal)
            })
            setInvestments(local_investments)
            // console.log(local_investments)
            setcategories( local_investments.map((investment) => investment.category))
            setinvestedAmounts (local_investments.map((investment) => investment.amountInvested))
            setprofits( local_investments.map((investment) => investment.profit));
          
            // Calculate total investment and total profit
            // settotalInvestment (investedAmounts.reduce((total, amount) => total + amount, 0));
            // settotalProfit( profits.reduce((total, profit) => total + profit, 0));
            // console.log(totalInvestment)
        }
      
      }, [dealInvestments,]);


      useEffect(() => {
        if (profits){
            console.log(categories)
            settotalInvestment (investedAmounts.reduce((total, amount) => total + amount, 0));
            settotalProfit( profits.reduce((total, profit) => total + profit, 0));
        }
      }, [profits,]);
//   const investments = [
//     { category: 'Stocks', amountInvested: 500000, profit: 100000 },
//     { category: 'Real Estate', amountInvested: 300000, profit: 50000 },
//     { category: 'Businesses', amountInvested: 200000, profit: 30000 },
//   ];

//   // Extract category names, investment, and profit data
//   const categories = investments.map((investment) => investment.category);
//   const investedAmounts = investments.map((investment) => investment.amountInvested);
//   const profits = investments.map((investment) => investment.profit);

//   // Calculate total investment and total profit
//   const totalInvestment = investedAmounts.reduce((total, amount) => total + amount, 0);
//   const totalProfit = profits.reduce((total, profit) => total + profit, 0);

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
  }, [totalProfit,]);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Invested Amount',
        data: investedAmounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Update background color
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Profit',
        data: profits,
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Update background color
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
  };
 
  const onClick = (event) => {
      if (getElementsAtEvent(chartRef.current, event).length > 0){
        // console.log(getElementsAtEvent(chartRef.current, event))

        let dataIndex = getElementsAtEvent(chartRef.current, event)[0].index
        console.log(dataIndex,investments[dataIndex])
        navigate('/SpecificInvestment/', { state: { 'information' :investments[dataIndex] } })
    }
  }

  return (
    <div className="container">
      <h1 className="dashboard-title">Welcome to Your Investment Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Portfolio Value</h5>
              <p className="card-text total-portfolio-value">${(totalInvestment + totalProfit).toString()}</p>
              <Link to="/PotentialInvestments/" className="btn btn-primary">
                View Potential Investments
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6"> 
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Investment Overview</h5>
              <p className="investment-overview">
                Total Investment: ${totalInvestment.toString()}
                <br />
                Total Profit: ${totalProfit.toString()}
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
      <Bar
          data={{
            ...chartData,
            // labels: categories.map((category) => (
            //     <>
            //     {category}
            //     {console.log(category)}
            //   <Link to={`/category/${category}`} key={category}>
            //     {category} hello
            //   </Link>
            //   </>
            // )),
          }}
          options={chartOptions}
          onClick = {onClick}
          ref ={chartRef}
        />
        {/* <canvas ref={chartRef}></canvas> */}
      </div>
    </div>
  );
};

export default ChartHome;
