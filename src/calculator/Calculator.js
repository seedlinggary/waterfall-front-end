import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Accordion from 'react-bootstrap/Accordion';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Profit from './Profit';
import Hurdle from './Hurdle';
import Fee from './Fee';
import Investor from './Investor';
const Calculator = () => {
    const navigate = useNavigate()
    const [irr_parri_passu, setIRRPariPassu] = useState(true)
    const [pay_gp_principal, setPayGPPrincipal] = useState(false)
    const [pay_gp_prefered, setPayGPPrefered] = useState(false)
    const [type_of_split, setTypeOfSplit] = useState("split_plus_percentage")
    const [capital_parri_passu, setCapitalParriPasu] = useState(false)
    const [type_of_hurdle, setTypeOfHurdle] = useState("irr_yearly_compund")
    const [way_in_which_to_split, setWayInWhichToSplit] = useState("investor_in_the_irr")
    const [principal_after_preffered, setPrincipalAfterPreffered] = useState(false)
    const [yr_strt_capital_payback, seYrStartCapitalPayback] = useState(10000)
    const [cost_of_property, setCostOfProperty] = useState(10000)
    const [bank_loan_amount, setBankLoanAmount] = useState(0)
    const [investment_name, setInvestmentName] = useState('Money Maker')
    const [investment_type, setInvestmentType] = useState('Real Estate')
    const [percentage_investment_owned, setPercentageInvestmentOwned] = useState(1)
    const [gp_amount, setGPAmount] = useState(100000)
    const [lp_amount, setLPAmount] = useState(0)
    const [waterfall_resp,setResp] = useState(null)
    const [investor_returns,setInvestorReturns] = useState(null)
    const [new_investor_profits,setNewLLcProfits] = useState([])
    
    const [respective_returns,setRespectiveReturns] = useState(null)
    const [cap_by_yr,setCapByYr] = useState(null)
    const [total_returned,setTotalReturned] = useState(null)
    const [new_splits,setNewSplits] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [sho, setSho] = useState(false);

    const handleClos = () => setSho(false);
    const handleSho = () => setSho(true);

    const [showSave, setShowSave] = useState(false);

    const handleCloseSave = () => setShowSave(false);
    const handleShowSave = () => setShowSave(true);
  
    const [showError, setShowError] = useState(true);

    const [savedInfo, setSavedInfo] = useState();

    const saveInfo = () => {
      let info = {
        "investment_info": {"name": investment_name,
        "investment_type": investment_type,
        "cost": cost_of_property,
        // "mortgage_amount": bank_loan_amount,
        "investment_return": profit

        },
         "llcs": [{"name": "Gary's LLC",
         "waterfall_preferences": {'irr_parri_passu': irr_parri_passu,
         'pay_gp_principal': pay_gp_principal,
         'pay_gp_prefered': pay_gp_prefered,
         'type_of_split': type_of_split,
         'capital_parri_passu': capital_parri_passu,
         'type_of_hurdle': type_of_hurdle,
         'way_in_which_to_split' : way_in_which_to_split,
         'principal_after_preffered': principal_after_preffered,
         'yr_strt_capital_payback': (yr_strt_capital_payback - 1)},
         "splits": arr,
         "percentage_investment_owned": percentage_investment_owned,
         "amount_gp_invested": gp_amount,
         "amount_lp_invested": lp_amount,
         "fees": fee,
        "investors": investora,
        "investment_frequency": profitFrequency,
        "capital_calls": []
        }]
        }  
        setSavedInfo(JSON.stringify(info))
    }
    const inputSavedData = e => {
      e.preventDefault();
      console.log(e.target.value)
      var savedData = JSON.parse(e.target.value);
      console.log(savedData)
      
      const fixed_investment_return = savedData.investment_info.investment_return.map(myFunction);
      
      function myFunction(value, index, array) {
        const new_value = value
        new_value.value.date = Date.parse(value.value.date)
        return new_value;
      }
      console.log(fixed_investment_return)
      console.log(savedData.investment_info.investment_return)
      setProfit(fixed_investment_return)
      console.log(savedData.investment_info.investment_return)
      
      setIRRPariPassu(savedData.llcs[0].waterfall_preferences.irr_parri_passu)
      setPayGPPrincipal(savedData.llcs[0].waterfall_preferences.pay_gp_principal)
      setPayGPPrefered(savedData.llcs[0].waterfall_preferences.pay_gp_prefered)
      setTypeOfSplit(savedData.llcs[0].waterfall_preferences.type_of_split)
      setCapitalParriPasu(savedData.llcs[0].waterfall_preferences.capital_parri_passu)
      setTypeOfHurdle(savedData.llcs[0].waterfall_preferences.type_of_hurdle)
      setWayInWhichToSplit(savedData.llcs[0].waterfall_preferences.way_in_which_to_split)
      setPrincipalAfterPreffered(savedData.llcs[0].waterfall_preferences.principal_after_preffered)
      seYrStartCapitalPayback(savedData.llcs[0].waterfall_preferences.yr_strt_capital_payback)

      setArr(savedData.llcs[0].splits);
      setInvestorA(savedData.llcs[0].investors)
      setLPAmount(savedData.llcs[0].amount_lp_invested)
      setGPAmount(savedData.llcs[0].amount_gp_invested)
      setPercentageInvestmentOwned(savedData.llcs[0].percentage_investment_owned)
      setFee(savedData.llcs[0].fees)
      const new_investment_frequency  = savedData.llcs[0].investment_frequency
      new_investment_frequency.start_date = Date.parse(savedData.llcs[0].investment_frequency.start_date)
      console.log(new_investment_frequency)
      console.log(savedData.llcs[0].investment_frequency)
      setProfitFrequency(savedData.llcs[0].investment_frequency)

    }
    const inputArr = [
        {
            value: {'hurdle' : .08,
                    'sponsor_percent' : 0,
                    'limited_partner_percent' : 1},
                    type: "",
        id: 0       },
    
    
      ];
        const [arr, setArr] = useState(inputArr);

      
    const feeArr = [
        {
            value: {'year' : 1000,
            'before_what_hurdle' : 1,
            'who_gets_this_fee' : 'NEED AN INPUT',
            'percentage_or_cash' : 324,
            'type_transaction' : 'cash',
            'type_of_fee' : 'hurdle'},
                type: ""
        }
        
      ];
    const [fee, setFee] = useState(feeArr);

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
      const profitArr = [
        {
          value: {'profit' : 1000,
                  'date': today},
                  type: "",
      id: 0       }

      ];
    
    
      const [profit, setProfit] = useState(profitArr);
      const [profitFrequency, setProfitFrequency] = useState({'rate':'Year','start_date': today} );


      const investorArr = [
        {
            value: {},
                    type: "",
        id: 0       },
    
    
      ];
    const [investora, setInvestorA] = useState(investorArr);
      const SendPromoteWaterfall = (e) => {

        setIRRPariPassu(true)
        setTypeOfSplit("split_percentage_of_owned")
        setCapitalParriPasu(true)
        setTypeOfHurdle("irr_yearly_compund")
        setWayInWhichToSplit("investor_in_the_irr")
        setPrincipalAfterPreffered(false)

    }
    const SendCashFlowWaterfall = (e) => {
      
      setIRRPariPassu(false)
      setPayGPPrincipal(true)
      setPayGPPrefered(true)
      setTypeOfSplit("split_plus_percentage")
      setCapitalParriPasu(true)
      setTypeOfHurdle("irr_yearly_compund")
      setWayInWhichToSplit("investor_on_top_of_irr")
      setPrincipalAfterPreffered(false)

  }
  const SendEuropean = (e) => {
    const prof = [
        {
            value: {'profit' : 8000},
                    type: "",
        id: 0       },
        {
            value: {'profit' :2500},
                    type: "",
        id: 1       },
        {
            value: {'profit' : 1040},
                    type: "",
        id: 2},
        {
            value: {'profit' :2000},
                    type: "",
        id: 3       },
        {
            value: {'profit' : 10340},
                    type: "",
        id: 4}
      ];
     
      const inp= [
        {
            value: {'hurdle' : .08,
                    'sponsor_percent' : 0,
                    'limited_partner_percent' : 1},
                    type: "",
        id: 0       },
        {
            value: {'hurdle' : .12,
                    'sponsor_percent' : .25,
                    'limited_partner_percent' : .75},
                    type: "",
        id: 1       },
    
        {
            value: {'hurdle' : 0,
                    'sponsor_percent' : .4,
                    'limited_partner_percent' : .6},
                    type: "",
        id: 2       }
    
      ];
    setProfit(prof)
    setArr(inp);
    setIRRPariPassu(true)
    setPayGPPrincipal(true)
    setTypeOfSplit("split_percentage_of_owned")
    setCapitalParriPasu(false)
    setTypeOfHurdle("non_yearly_compund")
    setWayInWhichToSplit("investor_in_the_irr")
    setPrincipalAfterPreffered(false)
    seYrStartCapitalPayback(0)
    setCostOfProperty(100000)
    setBankLoanAmount(90000)
    setLPAmount(9000)
    setGPAmount(1000)
    setInvestmentName('SendEuropean')
    setInvestmentType('real estate')

}
const SendCatchUp = (e) => {
        const prof = [
            {
                value: {'profit' : 8000},
                        type: "",
            id: 0       },
            {
                value: {'profit' :2500},
                        type: "",
            id: 1       },
            {
                value: {'profit' : 1040},
                        type: "",
            id: 2},
            {
                value: {'profit' :2000},
                        type: "",
            id: 3       },
            {
                value: {'profit' : 10340},
                        type: "",
            id: 4}
          ];
         
          const inp= [
            {
                value: {'hurdle' : .08,
                        'sponsor_percent' : 0,
                        'limited_partner_percent' : 1},
                        type: "",
            id: 0       },
            {
                value: {'hurdle' : .12,
                        'sponsor_percent' : .25,
                        'limited_partner_percent' : .75},
                        type: "",
            id: 1       },
        
            {
                value: {'hurdle' : 0,
                        'sponsor_percent' : .4,
                        'limited_partner_percent' : .6},
                        type: "",
            id: 2       }
        
          ];
          const fe= [
          {
            value: {'year' : 0,
                    'before_what_hurdle' : 0,
                    'who_gets_this_fee' : 'Catch_up',
                    'percentage_or_cash' : .04,
                    'type_transaction' : 'percentage',
                    'type_of_fee' : 'catch_up'},
            type: "",
        id: 0       }]
        setProfit(prof)
        setArr(inp);
        setFee(fe)
        setIRRPariPassu(true)
        setPrincipalAfterPreffered(false)
        seYrStartCapitalPayback(0)
        setCostOfProperty(100000)
        setBankLoanAmount(90000)
        setLPAmount(9000)
        setGPAmount(1000)
        setInvestmentName('SendCatchUp')
        setInvestmentType('real estate')
        setIRRPariPassu(false)
      setPayGPPrincipal(false)
      setPayGPPrefered(false)
      setTypeOfSplit("split_plus_percentage")
      setCapitalParriPasu(true)
      setTypeOfHurdle("irr_yearly_compund")
      setWayInWhichToSplit("investor_on_top_of_irr")

    }
        const SendAmerican = (e) => {
        const prof = [
            {
                value: {'profit' : 3185},
                        type: "",
            id: 0       },
            {
                value: {'profit' :5000},
                        type: "",
            id: 1       },
            {
                value: {'profit' : 303400},
                        type: "",
            id: 2}
          ];
          const inp = [
            {
                value: {'hurdle' : .02,
                        'sponsor_percent' : 0,
                        'limited_partner_percent' : 1},
                        type: "",
            id: 0       },
            {
                value: {'hurdle' : .15,
                        'sponsor_percent' : .2,
                        'limited_partner_percent' : .8},
                        type: "",
            id: 1       },
        
            {
                value: {'hurdle' : 0,
                        'sponsor_percent' : .4,
                        'limited_partner_percent' : .6},
                        type: "",
            id: 2       }
        
          ];
        setProfit(prof)
        setArr(inp);

        setIRRPariPassu(false)
        setPayGPPrincipal(true)
        setTypeOfSplit("split_plus_percentage")
        setCapitalParriPasu(false)
        setTypeOfHurdle("irr_yearly_compund")
        setWayInWhichToSplit("investor_on_top_of_irr")
        setPrincipalAfterPreffered(false)
        seYrStartCapitalPayback(3)
        setCostOfProperty(100000)
        setBankLoanAmount(90000)
        setLPAmount(9000)
        setGPAmount(1000)
        setInvestmentName('SendAmerican')
        setInvestmentType('real estate')
      
        // SendApi()
    }
    const SendAfterPreffered = (e) => {
        const prof = [
            {
                value: {'profit' : 500000},
                        type: "",
            id: 0       },
            {
                value: {'profit' :500000},
                        type: "",
            id: 1       },
            {
                value: {'profit' : 750000},
                        type: "",
            id: 2},
            {
                value: {'profit' : 750000},
                        type: "",
            id: 3},
            {
                value: {'profit' :1000000},
                        type: "",
            id: 4       },
            {
                value: {'profit' : 25000000},
                        type: "",
            id: 5}
          ];
          const inp = [
            {
                value: {'hurdle' : .08,
                        'sponsor_percent' : 0,
                        'limited_partner_percent' : 1},
                        type: "",
            id: 0       },
            {
                value: {'hurdle' : .125,
                        'sponsor_percent' : .15,
                        'limited_partner_percent' : .85},
                        type: "",
            id: 1       },
        
            {
                value: {'hurdle' : .15,
                        'sponsor_percent' : .25,
                        'limited_partner_percent' : .75},
                        type: "",
            id: 2       },
            {
                value: {'hurdle' : .175,
                        'sponsor_percent' : .40,
                        'limited_partner_percent' : .60},
                        type: "",
            id: 3       },
        
            {
                value: {'hurdle' : 0,
                        'sponsor_percent' : .50,
                        'limited_partner_percent' : .50},
                        type: "",
            id: 4       }
        
          ];
          let inv = [
            {value :{},
        id: 0},]
        setProfit(prof)
        setArr(inp);

        setIRRPariPassu(true)
        setPayGPPrincipal(false)
        setTypeOfSplit("straight")
        setCapitalParriPasu(true)
        setTypeOfHurdle("paydown_capital_paydown_irr")
        setWayInWhichToSplit("investor_on_top_of_irr")
        setPrincipalAfterPreffered(true)
        seYrStartCapitalPayback(8)
        setCostOfProperty(100000000)
        setBankLoanAmount(90000000)
        setLPAmount(10000000)
        setGPAmount(0)
        setInvestmentName('SendAfterPreffered')
        setInvestmentType('real estate')
        setInvestorA(inv)

      
        // SendApi()
    }
    const SendPrefferedNonIRRpari = (e) => {
        const prof = [
            {
                value: {'profit' : 300},
                        type: "",
            id: 0       },
            {
                value: {'profit' :3000},
                        type: "",
            id: 1       },
            {
                value: {'profit' : 10000},
                        type: "",
            id: 2}
          ];
          const inp = [
            {
                value: {'hurdle' : .08,
                        'sponsor_percent' : 0,
                        'limited_partner_percent' : 1},
                        type: "",
            id: 0       },
            {
                value: {'hurdle' : .12,
                        'sponsor_percent' : .15,
                        'limited_partner_percent' : .85},
                        type: "",
            id: 1       },
        
            {
                value: {'hurdle' : 0,
                        'sponsor_percent' : .25,
                        'limited_partner_percent' : .75},
                        type: "",
            id: 2       }
        
          ];
          let inv = [
            {value :{},
        id: 0},]
        let fee = [
            {
                value: {},
                type: "",
            id: 0       },]
        setProfit(prof)
        setArr(inp);

        setIRRPariPassu(false)
        setPayGPPrincipal(true)
        setPayGPPrefered(true)
        setTypeOfSplit("straight")
        setCapitalParriPasu(true)
        setTypeOfHurdle("paydown_capital_paydown_irr")
        setWayInWhichToSplit("investor_on_top_of_irr")
        setPrincipalAfterPreffered(true)
        seYrStartCapitalPayback(3)
        setCostOfProperty(100000)
        setBankLoanAmount(90000)
        setLPAmount(8000)
        setGPAmount(2000)
        setInvestmentName('PrefferedNonIRRpari')
        setInvestmentType('real estate')
        setInvestorA(inv)
        setFee(fee)

      
        // SendApi()
    }
    const SendApi = (e) => {
      let info = {
          "investment_info": {"name": investment_name,
          "investment_type": investment_type,
          "cost": cost_of_property,
          // "mortgage_amount": bank_loan_amount,
          "investment_return": profit

          },
           "llcs": [{"name": "Gary's LLC",
           "waterfall_preferences": {'irr_parri_passu': irr_parri_passu,
           'pay_gp_principal': pay_gp_principal,
           'pay_gp_prefered': pay_gp_prefered,
           'type_of_split': type_of_split,
           'capital_parri_passu': capital_parri_passu,
           'type_of_hurdle': type_of_hurdle,
           'way_in_which_to_split' : way_in_which_to_split,
           'principal_after_preffered': principal_after_preffered,
           'yr_strt_capital_payback': (yr_strt_capital_payback - 1)},
           "splits": arr,
           "percentage_investment_owned": percentage_investment_owned,
           "amount_gp_invested": gp_amount,
           "amount_lp_invested": lp_amount,
           "fees": fee,
          "investors": investora,
          "investment_frequency": profitFrequency,
          }]
          }  

      let backend = 'http://127.0.0.1:5000'
      // let backend = 'http://waterfall-env.eba-a4a3q6d3.ap-northeast-1.elasticbeanstalk.com/'
      // let backend = 'https://d30c84rzmrhbgy.cloudfront.net'
      // let address = `/waterfall_calc`
      let address = `/investment_calc`
      console.log(pay_gp_principal)
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
          },
          body: JSON.stringify(info)
      };
      fetch(`${backend}${address}`, requestOptions)
          .then(async response => {
              const isJson = response.headers.get('content-type')?.includes('application/json');
              const data = isJson && await response.json();
              // console.error('There was a response!', response);
              // check for error response
              if (!response.ok) {
                  // get error message from body or default to response status
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
              }
  
              // console.error('There was data!', data);
              setResp(data.profits)
              setRespectiveReturns(data.respective_returns)
              setCapByYr(data.total_capital_returned_by_year)
              setInvestorReturns(data.investor_returns)
              setTotalReturned(data.total_returned)
              setNewLLcProfits(data.new_llc_profits)
              setNewSplits(data.new_splits)
              setIsPending(false)
              setError(null)
      return  data 
          })
          .catch(error => {
              console.error('There was an error!', error);
              setIsPending(false)
              setError(error.message)    
          }); 
  
      e.preventDefault();

      
      }    
    const downloadcsv = (e) => {
        let info = {
            "investment_info": {"name": investment_name,
            "investment_type": investment_type,
            "cost": cost_of_property,
            // "mortgage_amount": bank_loan_amount,
            "investment_return": profit,

            },
             "llcs": [{"name": "Gary's LLC",
             "waterfall_preferences": {'irr_parri_passu': irr_parri_passu,
             'pay_gp_principal': pay_gp_principal,
             'pay_gp_prefered': pay_gp_prefered,
             'type_of_split': type_of_split,
             'capital_parri_passu': capital_parri_passu,
             'type_of_hurdle': type_of_hurdle,
             'way_in_which_to_split' : way_in_which_to_split,
             'principal_after_preffered': principal_after_preffered,
             'yr_strt_capital_payback': (yr_strt_capital_payback - 1)},
             "splits": arr,
             "percentage_investment_owned": percentage_investment_owned,
             "amount_gp_invested": gp_amount,
             "amount_lp_invested": lp_amount,
             "fees": fee,
            "investors": investora,
            "investment_frequency": profitFrequency,
            }]
            }  

        let backend = 'http://127.0.0.1:5000'
        // let backend = 'http://waterfall-env.eba-a4a3q6d3.ap-northeast-1.elasticbeanstalk.com/'
        // let backend = 'https://d30c84rzmrhbgy.cloudfront.net'
        // let address = `/waterfall_calc`
        let address = `/downloadcsv`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            },
            body: JSON.stringify(info)
        };
        fetch(`${backend}${address}`, requestOptions)
            .then((response) => {
              response.blob().then((blob) => {
                 saveBlob(blob, 'waterfallDistribution');
              });
        });

        e.preventDefault();
        }    

        function saveBlob(blob, filename) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click(); 
        }
      const SendInvestmentApi = (e) => {
            const prof = [
                {
                    value: {'profit' : 8000},
                            type: "",
                id: 0       },
                {
                    value: {'profit' :2500},
                            type: "",
                id: 1       },
                {
                    value: {'profit' : 1040},
                            type: "",
                id: 2},
                {
                    value: {'profit' :2000},
                            type: "",
                id: 3       },
                {
                    value: {'profit' : 10340},
                            type: "",
                id: 4}
              ];
             
              const inp= [
                {
                    value: {'hurdle' : .08,
                            'sponsor_percent' : 0,
                            'limited_partner_percent' : 1},
                            type: "",
                id: 0       },
                {
                    value: {'hurdle' : .12,
                            'sponsor_percent' : .25,
                            'limited_partner_percent' : .75},
                            type: "",
                id: 1       },
            
                {
                    value: {'hurdle' : 0,
                            'sponsor_percent' : .4,
                            'limited_partner_percent' : .6},
                            type: "",
                id: 2       }
            
              ];
            let inv = [
                {value :{'name': "gary",
            "email": "yahoo@all.com",
            "country_of_origin": "US",
            "tax_percentage_withheld": .06,
            "amount_invested": 400,
            "year_bought_in": 1},
            id: 0},
            {value :{'name': "bary",
            "email": "yahoo@all.com",
            "country_of_origin": "US",
            "tax_percentage_withheld": .07,
            "amount_invested": 800,
            "year_bought_in": 1},
            id: 1},
            {value :{'name': "cary",
            "email": "yahoo@all.com",
            "country_of_origin": "US",
            "tax_percentage_withheld": .08,
            "amount_invested": 1200,
            "year_bought_in": 1},
            id: 2},
            {value :{'name': "lary",
            "email": "yahoo@all.com",
            "country_of_origin": "US",
            "tax_percentage_withheld": .09,
            "amount_invested": 1600,
            "year_bought_in": 1},
            id: 3},
            {value :{'name': "dary",
            "email": "yahoo@all.com",
            "country_of_origin": "US",
            "tax_percentage_withheld": .1,
            "amount_invested": 2000,
            "year_bought_in": 1,
            id: 4}},
            {value :{'name': "Joe",
            "email": "yahoo@all.com",
            "country_of_origin": "US",
            "tax_percentage_withheld": .1,
            "amount_invested": 2000,
            "year_bought_in": 1,
            id: 5}},
            {value :{'name': "Ben",
            "email": "yahoo@all.com",
            "country_of_origin": "US",
            "tax_percentage_withheld": .1,
            "amount_invested": 1000,
            "year_bought_in": 1,
            id: 6}}]
            setProfit(prof)
            setArr(inp);
            setIRRPariPassu(true)
            setPayGPPrincipal(true)
            setTypeOfSplit("split_percentage_of_owned")
            setCapitalParriPasu(false)
            setTypeOfHurdle("non_yearly_compund")
            setWayInWhichToSplit("investor_in_the_irr")
            setPrincipalAfterPreffered(false)
            seYrStartCapitalPayback(0)
            setCostOfProperty(100000)
            // setBankLoanPercentage(.9)
            setInvestorA(inv)
          
            setBankLoanAmount(90000)
            setLPAmount(9000)
            setGPAmount(1000)
            setInvestmentName('PrefferedNonIRRpari')
            setInvestmentType('real estate')
    
            
            }    
       
            return ( 
        <div > 
          {showError &&  <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
        <Alert.Heading>Warning!</Alert.Heading>
        <p>
          This website does not take responsibility for any information given or provided. Please compare your waterfall results against your own information for accurecy.
        </p>
      </Alert>}
         
                <>
                <br></br>
                <Row>
      <Col md={{ span: 2, offset: 3 }}>   
      <Button variant="info" onClick={handleShow}  >
        See current inputs
      </Button>

      
      </Col>  <Col md={{ span: 2, offset: 2 }}>   
      <Button variant="info" onClick={handleSho}>
        Sample inputs
      </Button>

    </Col>  
               </Row>
               
      
      <Button variant="info" onClick={handleShowSave} className="me-2">
        Save Info
      </Button>

      <Offcanvas show={showSave} onHide={handleCloseSave} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Saved Data</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          To save time click the button bellow. Save the code somewhere safe for later.
           Whenever you come back take the code you saved and place it in the text box bellow. All of your information and preferences will return
          <br></br>
          <Button variant="info" onClick={saveInfo}>
        Show me what to save
      </Button>
      <br>
      
      </br>
      <ListGroup>
      <ListGroup.Item disabled>Take this info and put it somewhere safe</ListGroup.Item>
      <ListGroup.Item>{savedInfo}</ListGroup.Item>
    </ListGroup>
    <Form>
     
      <Form.Group className="mb-3"  onChange={inputSavedData}>
        <Form.Label>Input Saved Data Here.</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
        </Offcanvas.Body>
      </Offcanvas>
    
      <Offcanvas show={sho} onHide={handleClos} scroll={true} backdrop={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sample Inputs</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ListGroup>
      <ListGroup.Item> An classic American waterfall. Where you start paying back your capital during the last year of investment.
        <br></br>
      <Button variant="primary" onClick={SendAmerican}>
        Create American Waterfall
      </Button></ListGroup.Item>
      <ListGroup.Item>An classic European waterfall. Where you start paying back your capital from the first dollor paid back.
        <br></br>
        <Button variant="primary" onClick={SendEuropean}>
        Create European Waterfall
      </Button>
        </ListGroup.Item>
      <ListGroup.Item>Another classic  waterfall. Where you start paying back your capital after the preferred return is paid back.
        <br></br>
        <Button variant="primary" onClick={SendAfterPreffered}>
        Create after preferred Waterfall
      </Button>
        </ListGroup.Item>
      <ListGroup.Item>A classic Cashflow waterfall with a catchup, so the GP can get a cut after LP gets their prefered and capital.
        <br></br>
        <Button variant="primary" onClick={SendCatchUp}>
      SendCatchUp
      </Button>
        </ListGroup.Item>
      <ListGroup.Item>A classic European waterfall with Investors added in to show you how its divied up.
      <br></br>
      <Button variant="primary" onClick={SendInvestmentApi}>
      Sendinvestmentapi
      </Button>
      </ListGroup.Item>
    </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inputs</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        irr_parri_passu: {irr_parri_passu && 'true'} {!irr_parri_passu && 'false'},
        <br></br>
        pay_gp_principal: {pay_gp_principal && 'true'} {!pay_gp_principal && 'false'},
        <br></br>
        pay_gp_prefered: {pay_gp_prefered && 'true'} {!pay_gp_prefered && 'false'},
        <br></br>
        type_of_split: {type_of_split },
        <br></br>
        capital_parri_passu: {capital_parri_passu && 'true'} {!capital_parri_passu && 'false'},
        <br></br>
        type_of_hurdle: {type_of_hurdle},
        <br></br>
        way_in_which_to_split: {way_in_which_to_split},
        <br></br>
        principal_after_preferred: {principal_after_preffered && 'true'} {!principal_after_preffered && 'false'},
        <br></br>
        yr_strt_capital_payback: {yr_strt_capital_payback },
        <br></br>
        amount_gp_invested: {gp_amount },
        <br></br>
        amount_lp_invested: {lp_amount },
        <br></br>
        <br></br>
        {/* gp_percentage_of_cash_needed: {gp_percentage_of_cash_needed }, */}
        <br></br>
        {arr.map((item, i) => {
                    return (
                        
        <div>
         Split {i + 1}: LP: {item.value.limited_partner_percent} / GP: {item.value.sponsor_percent} :  Hurdle: {item.value.hurdle} 
         <br></br>

      </div>
                    )
                    })}
        {profit.map((prof, i) => {
                        return (
                            
            <div>
             Year {i + 1}: profit ${prof.value.profit}  
             <br></br>
    
          </div>
                        )
                        })}
                         
                          {fee[0].value.percentage_or_cash && fee.map((fee, i) => {
                        return (
                            
            <div>
             Fee {i + 1}:to Whom:{fee.value.type_of_fee} amount {fee.value.percentage_or_cash}  {fee.value.type_transaction}to whom: {fee.value.who_gets_this_fee}  yr:{fee.value.year} hurdle:{fee.value.before_what_hurdle} 
             <br></br>
    
          </div>
                        )
                        })}
                        <br></br>
            {investora[0].value.name && investora.map((investor, i) => {
                        return (
                          // {'name': "gary",
                          // "email": "yahoo@all.com",
                          // "country_of_origin": "US",
                          // "tax_percentage_withheld": .06,
                          // "amount_invested": 100,
                          // "year_bought_in": 1},   
            <div>
             Investor {i + 1}: Name: {investor.value.name}, Amount invested: ${investor.value.amount_invested}, Country: {investor.value.country_of_origin}, Tax percentage withheld: {investor.value.tax_percentage_withheld}
             <br></br>
    
          </div>
                        )
                        })}
    
  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>  
          <p>Add the Investment information so you can check the numbers and see if it is a good deal for you!</p>     
          <h3>Investment information</h3>     
          <Row>
        <Col></Col>
        <Col xs={9}>  
      
              
      {/* <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Investment Name</Form.Label>
          <Form.Control  placeholder={investment_name} onChange={(e) => setInvestmentName(e.target.value)} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Investment type</Form.Label>
          <Form.Control  placeholder={investment_type} onChange={(e) => setInvestmentType(e.target.value)} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Investment Cost</Form.Label>
          <Form.Control  placeholder={cost_of_property} onChange={(e) => setCostOfProperty(e.target.value)} />
        </Form.Group>
         <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Amount loan from bank</Form.Label>
          <Form.Control  placeholder={bank_loan_amount} onChange={(e) => setBankLoanAmount(e.target.value)} />
        </Form.Group>
    

      </Row> */}
      <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Years Of Profit</Accordion.Header>
        <Accordion.Body>
    
        <Profit profit={profit} setProfit={setProfit} profitFrequency={profitFrequency} setProfitFrequency={setProfitFrequency}></Profit>

              </Accordion.Body>
      </Accordion.Item>    

      <Accordion.Item eventKey="1">
        <Accordion.Header>Waterfall Information</Accordion.Header>
        <Accordion.Body>
      
        <Button variant="primary" onClick={SendPromoteWaterfall}>
        Create PromoteWaterfall
      </Button>
      <p></p>
      <Button variant="primary" onClick={SendCashFlowWaterfall}>
      Create CashFlowWaterfall
      </Button>
   
      <Row className="mb-3">
        
      {/* <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>% owned by this waterfall</Form.Label>
          <Form.Control  placeholder={percentage_investment_owned} onChange={(e) => setPercentageInvestmentOwned(e.target.value)} />
        </Form.Group>         */}
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>GP amount sponsered</Form.Label>
          <Form.Control  placeholder={gp_amount} onChange={(e) => setGPAmount(e.target.value)} />
        </Form.Group>        
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>LP amount sponsored (optional if no input of investers)</Form.Label>
          <Form.Control  placeholder={lp_amount} onChange={(e) => setLPAmount(e.target.value)} />
        </Form.Group>
        
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Check 
        type="switch"
        id="custom-switch"
        label="pay back principal after preferred"
        checked={principal_after_preffered}
        onChange={(e) => principal_after_preffered ? setPrincipalAfterPreffered(false) : setPrincipalAfterPreffered(true)}
      />        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Year start paying back principal</Form.Label>
        <Form.Control  placeholder={yr_strt_capital_payback} onChange={(e) => seYrStartCapitalPayback(e.target.value)} />
    </Form.Group>

      </Row>
      <Row className="mb-3">
          
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Type of split</Form.Label>
        <Form.Select aria-label="Default select example" onChange={(e) => setTypeOfSplit(e.target.value)}>
              <option value={type_of_split}>{type_of_split}</option>
              <option value="straight">straight split</option>
              <option value="split_plus_percentage">split_plus_percentage</option>
              <option value="split_percentage_of_owned">split_percentage_of_owned</option>
          </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Way In which to split</Form.Label>
        <Form.Select aria-label="Default select example" onChange={(e) => setWayInWhichToSplit(e.target.value)}>
              <option value={way_in_which_to_split}>{way_in_which_to_split}</option>
              <option value="investor_in_the_irr">GP apart of the whole</option>
              <option value="investor_on_top_of_irr">GP's cut over the whole (gemara style)</option>
          </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Type of hurdle</Form.Label>
        <Form.Select aria-label="Default select example"  onChange={(e) => setTypeOfHurdle(e.target.value)}>
              <option value={type_of_hurdle}>{type_of_hurdle}</option>
              <option value="non_yearly_compund">non yearly compund </option>
              <option value="irr_yearly_compund">irr yearly compund</option>
              <option value="paydown_capital_paydown_irr">paydown capital paydown irr</option>
          </Form.Select>
          </Form.Group>
          
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="irr_parri_passu"
          checked={irr_parri_passu}
          onChange={(e) => irr_parri_passu ? setIRRPariPassu(false) : setIRRPariPassu(true)}
        />        </Form.Group>
        { !irr_parri_passu  && <>
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Check 
          type="switch"
          id="custom-switch"
          label="pay_gp_prefered"
          checked={pay_gp_prefered}
          onChange={(e) => pay_gp_prefered ? setPayGPPrefered(false) : setPayGPPrefered(true)}
        />        </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Check 
          type="switch"
          id="custom-switch"
          label="pay_gp_principal"
          checked={pay_gp_principal}
  
          onChange={(e) => pay_gp_principal ? setPayGPPrincipal(false) : setPayGPPrincipal(true)}
        />        </Form.Group>
        </>
        }
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Check 
          type="switch"
          id="custom-switch"
          label="capital_parri_passu"
          checked={capital_parri_passu}
  
          onChange={(e) => capital_parri_passu ? setCapitalParriPasu(false) : setCapitalParriPasu(true)}
        />        </Form.Group>
      
        </Row>
   
      </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Split and Hurdle Information</Accordion.Header>
        <Accordion.Body>
        <Hurdle arr={arr} setArr={setArr}></Hurdle>

              </Accordion.Body>
      </Accordion.Item>  
       <Accordion.Item eventKey="3">
        <Accordion.Header>Fee's (optional)</Accordion.Header>
        <Accordion.Body>
    <Fee fee={fee} setFee={setFee}></Fee>
              </Accordion.Body>
      </Accordion.Item>     <Accordion.Item eventKey="4">
        <Accordion.Header>Add Investors (optional)</Accordion.Header>
        <Accordion.Body>
          <Investor investora={investora} setInvestorA={setInvestorA}></Investor>

              </Accordion.Body>
      </Accordion.Item>
    </Accordion>

    <br></br>
       
<br></br>
      
      <Row>
      <Col md={{ span: 2, offset: 3 }}>   
      <Button variant="success" onClick={SendApi}>
        Create Waterfall
      </Button>

      
      </Col>  <Col md={{ span: 2, offset: 2 }}>   
      <Button variant="success" onClick={downloadcsv}>
        Download .xlsx File
      </Button>

    </Col>  
               </Row>
      </Col>
        <Col></Col>
</Row>

    
      
      
      {isPending && <div> Loading... </div>}
              {error && <div> error loading... </div>}
              <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="General Waterfall Info">
        <div>        <Table responsive>
      <thead>
        <tr>
        <th>Hurdle</th>
        <th>info/yrs</th>

          {new_investor_profits && new_investor_profits.map((profit, index) => (
            <th key={index}>{profit.toLocaleString()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>

              { waterfall_resp && waterfall_resp.map((year, id) =>  
               
               <tr>
                               <td>{id + 1}  {new_splits  && new_splits[id] && <div>Hurdle:{new_splits[id].hurdle.toLocaleString()} Split:{new_splits[id].limited_partner_percent.toLocaleString()}/{new_splits[id].sponsor_percent.toLocaleString()}</div>}</td>

                <td>
                                            <Table striped>
                                <tbody>
                                
                                <tr>
                            <td>capital_returned</td>
                            </tr>
                            
                          
                            <tr>
                            <td>Amount to distribute</td>
                            </tr>
                            <tr>
                            <td>Sponsor Share</td>
                            </tr>
                            <tr>
                            <td>LP share</td>
                            </tr>
                            
                                </tbody>
                                </Table>
                                </td>
               {year.map((inf, index) => (
                 <td key={index}> 

                    <Table striped>
                        <tbody>
                
                        <tr>
                            <td>{inf.capital_returned.toLocaleString()}  </td>
                            </tr>
                            
                    
                            <tr>
                            <td>{inf.amount_to_distribute_in_this_hurdle.toLocaleString()}</td>
                            </tr>
                            <tr>
                            <td>{inf.sponsor_share.toLocaleString()}</td>
                            </tr>
                            <tr>
                            <td>{inf.lp_share.toLocaleString()}</td>
                            </tr>
                            
                            {inf.fees && inf.fees.map((fee, index) => (
                                 <>
                                
                            <tr>
                            <td>{fee.name}: {fee.amount_given}/{fee.out_of}</td>
                            </tr>
                          
                                
                                 </>
                            ))
                            }
                        </tbody>
                        </Table>
                 </td>
               ))}
               
             </tr>
           )}
            </tbody>
            <tbody>
        <tr>
        <th>Yearly Respective Profits</th>
          {respective_returns && respective_returns.map((profit, index) => (
                            <td key={index}> 

                            <Table striped>
                                <tbody>
                                <tr>
                            <td> Sponsor distributions</td>
                            <td>{profit.sponsor.toLocaleString()}</td>
                            </tr>       <tr>
                            <td>LP distributions</td>
                            <td>{profit.lp.toLocaleString()}</td>
                            </tr>
                                </tbody>
                                </Table>
                         </td>
        
               
           
      ))}
        </tr>
      </tbody>          <tbody>
        <tr>
        <th>Total returned  capital till this point in year</th>
          {respective_returns && cap_by_yr.map((capital, index) => (
                            <td key={index}> 

                            <Table striped>
                                <tbody>
                                <tr>
                            <td> Sponsor Capital</td>
                            <td>{capital[1].toLocaleString()}</td>
                            </tr>       <tr>
                            <td>LP capital</td>
                            <td>{capital[0].toLocaleString()}</td>
                            </tr>
                                </tbody>
                                </Table>
                         </td>
            // const [cap_by_yr,setCapByYr] = useState(null)
            // const [total_returned,setTotalReturned] = useState(null)
        
               
           
      ))}
        </tr>
      </tbody>
      {total_returned && <div>    <tbody>
        <tr>
        <th>Total returned</th>

        <Table striped>
            <tbody>
            <tr>
        <td> Sponsor </td>
        <td>{total_returned.sponsor.toLocaleString()}</td>
        </tr>       <tr>
        <td>LP </td>
        <td>{total_returned.lp.toLocaleString()}</td>
        </tr>
            </tbody>
            </Table>
   
        </tr>
      </tbody></div>}
  
    </Table>
</div>
      </Tab><Tab eventKey="in_depth" title="In Depth Waterfall">
        <div>        <Table responsive>
      <thead>
        <tr>
        <th>Hurdle</th>
        <th>info/yrs</th>

          {new_investor_profits && new_investor_profits.map((profit, index) => (
            <th key={index}>{profit.toLocaleString()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>

              { waterfall_resp && waterfall_resp.map((year, id) =>  
               
               <tr>
                               <td>{id + 1}  {new_splits  && new_splits[id] && <div>Hurdle:{new_splits[id].hurdle.toLocaleString()} Split:{new_splits[id].limited_partner_percent.toLocaleString()}/{new_splits[id].sponsor_percent.toLocaleString()}</div>}</td>

                <td>
                                            <Table striped>
                                <tbody>
                                {id == 0 && <><tr>
                            <td>gp_prehurdle  </td>
                            </tr>
                            
                            <tr>
                            <td>gp_hurdle_top_amount</td>
                            </tr>
                        </>}
                                <tr>
                            <td>capital_returned</td>
                            </tr>
                            
                            <tr>
                            <td>pre hurdle amount</td>
                            </tr>
                        
                            <tr>
                            <td>Amount to distribute</td>
                            </tr>
                            <tr>
                            <td>Sponsor Share</td>
                            </tr>
                            <tr>
                            <td>LP share</td>
                            </tr>
                            <tr>
                            <td>hurdle_top_amount</td>
                            </tr>
                            <tr>
                            <td>Money left to distribute</td>
                            </tr>
                            <tr>
                            <td>total up to date distributions</td>
                            </tr>
                                </tbody>
                                </Table>
                                </td>
               {year.map((inf, index) => (
                 <td key={index}> 

                    <Table striped>
                        <tbody>
                        {id == 0 && <><tr>
                            <td>{inf.gp_prehurdle.toLocaleString()}  </td>
                            </tr>
                            
                            <tr>
                            <td>{inf.gp_hurdle_top_amount.toLocaleString()}</td>
                            </tr>
                        </>}
                        <tr>
                            <td>{inf.capital_returned.toLocaleString()}  </td>
                            </tr>
                            
                            <tr>
                            <td>{inf.prehurdle.toLocaleString()}</td>
                            </tr>
                        
                            <tr>
                            <td>{inf.amount_to_distribute_in_this_hurdle.toLocaleString()}</td>
                            </tr>
                            <tr>
                            <td>{inf.sponsor_share.toLocaleString()}</td>
                            </tr>
                            <tr>
                            <td>{inf.lp_share.toLocaleString()}</td>
                            </tr>
                            <tr>
                            <td>{inf.hurdle_top_amount}</td>
                            </tr>
                            <tr>
                            <td>{inf.money_left_to_distribute_after_hurdle.toLocaleString()}</td>
                            </tr>
                            <tr>
                            <td>{inf.total_up_to_date_amount_distributed_to_lp.toLocaleString()}</td>
                            </tr>
                            {inf.fees && inf.fees.map((fee, index) => (
                                 <>
                                
                            <tr>
                            <td>{fee.name}: {fee.amount_given.toLocaleString()}/{fee.out_of.toLocaleString()}</td>
                            </tr>
                          
                                
                                 </>
                            ))
                            }
                        </tbody>
                        </Table>
                 </td>
               ))}
               
             </tr>
           )}
            </tbody>
            <tbody>
        <tr>
        <th>Yearly Respective Profits</th>
          {respective_returns && respective_returns.map((profit, index) => (
                            <td key={index}> 

                            <Table striped>
                                <tbody>
                                <tr>
                            <td> Sponsor distributions</td>
                            <td>{profit.sponsor.toLocaleString()}</td>
                            </tr>       <tr>
                            <td>LP distributions</td>
                            <td>{profit.lp.toLocaleString()}</td>
                            </tr>
                                </tbody>
                                </Table>
                         </td>
        
               
           
      ))}
        </tr>
      </tbody>          <tbody>
        <tr>
        <th>Total returned  capital till this point in year</th>
          {respective_returns && cap_by_yr.map((capital, index) => (
                            <td key={index}> 

                            <Table striped>
                                <tbody>
                                <tr>
                            <td> Sponsor Capital</td>
                            <td>{capital[1].toLocaleString()}</td>
                            </tr>       <tr>
                            <td>LP capital</td>
                            <td>{capital[0].toLocaleString()}</td>
                            </tr>
                                </tbody>
                                </Table>
                         </td>               
           
      ))}
        </tr>
      </tbody>
      {total_returned && <div>    <tbody>
        <tr>
        <th>Total returned</th>

        <Table striped>
            <tbody>
            <tr>
        <td> Sponsor </td>
        <td>{total_returned.sponsor.toLocaleString()}</td>
        </tr>       <tr>
        <td>LP </td>
        <td>{total_returned.lp.toLocaleString()}</td>
        </tr>
            </tbody>
            </Table>
   
        </tr>
      </tbody></div>}
  
    </Table>
</div>
      </Tab>
      {investor_returns && 
      <Tab eventKey="profile" title="Each persons return">
      <div>        <Table responsive striped="columns">
      <thead>
        <tr>
        <th>Investor</th>
        
        { investor_returns && investor_returns.map((investor_return, id) =>  
        <>
               
               
               {id == 0 && investor_return[1].map((inv, index) => (
                <>
                <td> year # {index + 1}</td>
                 {inv.returns.map((inv, index) => (
                <>
                
                    <td>hurdle num</td>
                    <td>portion recieved</td>
                </>
                 ))}
                <td>Total year recieved</td>
                    <td>amount withheld</td>
                    <td>actual returned</td>
                    <td>percentage withheld</td>
                    <td>country</td>
                    <td>ownership %</td>
                    <td>capital returned</td>
                    
                </>
               
               ))}
             </>
        )}
        </tr>
      </thead>
      <tbody>

              { investor_returns && investor_returns.map((investor_return, id) =>  
               <tr>
               <td>{investor_return[0]}</td>
               {investor_return[1].map((inv, index) => (
                <>
                 <td> new year</td>
                 {inv.returns.map((inv, index) => (
                <>
                    <td>{inv.hurdle_num}</td>
                    <td>{inv.portion_recieved.toLocaleString()}</td>
                </>
                 ))}
                <td>{inv.total_investor_returned.toLocaleString()}</td>
                    <td >{inv.amount_withheld.toLocaleString()}</td>
                    <td>{inv.actual_returned.toLocaleString()}</td>
                    <td>{inv.percentage_withheld}</td>
                    <td>{inv.country_of_origin}</td>
                    <td>{inv.percentage_of_total}</td>
                    <td>{inv.capital_returned.toLocaleString()}</td>
                   
                </>
              
                ))}       
             </tr>
           )}
            </tbody>

  
    </Table>
</div>
      </Tab>
      }
    </Tabs>
      </div>   
    )
}
 
export default Calculator;