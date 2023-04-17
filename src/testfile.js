let info = {"waterfall_preferences": {'irr_parri_passu': true,
'pay_gp_principal': false,
'type_of_split': "straight",
'capital_parri_passu': true,
'type_of_hurdle': "paydown_capital_paydown_irr",
'way_in_which_to_split' : "investor_on_top_of_irr",
'principal_after_preffered': true,
'yr_strt_capital_payback': 8},
"splits": inputArr,
"investment_return": profitArr,
"cost_of_property": 100000000,
"bank_loan_percentage": .9,
"gp_percentage_of_cash_needed": 0,
"fees": feeArr,
}    


const inputArr = [
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
        value: {'hurdle' : .20,
                'sponsor_percent' : .50,
                'limited_partner_percent' : .50},
                type: "",
    id: 4       }

  ];

  const profitArr = [
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



  let info = {"waterfall_preferences": {'irr_parri_passu': irr_parri_passu,
  'pay_gp_principal': pay_gp_principal,
  'type_of_split': type_of_split,
  'capital_parri_passu': capital_parri_passu,
  'type_of_hurdle': type_of_hurdle,
  'way_in_which_to_split' : way_in_which_to_split,
  'principal_after_preffered': principal_after_preffered,
  'yr_strt_capital_payback': yr_strt_capital_payback},
  "splits": inputArr,
  "investment_return": profitArr,
  "cost_of_property": cost_of_property,
  "bank_loan_percentage": bank_loan_percentage,
  "gp_percentage_of_cash_needed": gp_percentage_of_cash_needed,
  "fees": feeArr,
  }    
  const inputArr = [
    {
        value: {'hurdle' : .08,
                'sponsor_percent' : 0,
                'limited_partner_percent' : 1},
                type: "",
    id: 0       },
    {
        value: {'hurdle' : .12,
                'sponsor_percent' : .3,
                'limited_partner_percent' : .7},
                type: "",
    id: 1       },

    {
        value: {'hurdle' : 0,
                'sponsor_percent' : .4,
                'limited_partner_percent' : .6},
                type: "",
    id: 2       }

  ];
  const profitArr = [
    {
        value: {'profit' : 1000},
                type: "",
    id: 0       },
    {
        value: {'profit' :500},
                type: "",
    id: 1       },
    {
        value: {'profit' : 30340},
                type: "",
    id: 2}
  ];

          // let info = {"waterfall_preferences": {'irr_parri_passu': irr_parri_passu,
        // 'pay_gp_principal': pay_gp_principal,
        // 'pay_gp_prefered': pay_gp_prefered,
        // 'type_of_split': type_of_split,
        // 'capital_parri_passu': capital_parri_passu,
        // 'type_of_hurdle': type_of_hurdle,
        // 'way_in_which_to_split' : way_in_which_to_split,
        // 'principal_after_preffered': principal_after_preffered,
        // 'yr_strt_capital_payback': (yr_strt_capital_payback - 1)},
        // "splits": arr,
        // "investment_return": profit,
        // "cost_of_property": cost_of_property,
        // "bank_loan_percentage": bank_loan_percentage,
        // "gp_percentage_of_cash_needed": gp_percentage_of_cash_needed,
        // "fees": fee,
        // }       


        const feeArr = [
            {
                value: {'year' : 0,
                        'before_what_hurdle' : 0,
                        'who_gets_this_fee' : 'HEATING',
                        'percentage_or_cash' : 3000,
                        'type_transaction' : 'cash',
                        'type_of_fee' : 'capital'},
                type: "",
            id: 0       },
            {     value: {'year' : 'x',
            'before_what_hurdle' : 1,
            'who_gets_this_fee' : 'CLEANING',
            'percentage_or_cash' : .05,
            'type_transaction' : 'percentage',
            'type_of_fee' : 'hurdle'},
    type: "",
    id: 1       },
    {     value: {'year' : 'x',
    'before_what_hurdle' : 2,
    'who_gets_this_fee' : 'WASTE',
    'percentage_or_cash' : 50,
    'type_transaction' : 'cash',
    'type_of_fee' : 'hurdle'},
    type: "",
    id: 2       },
    {     value: {'year' : 2,
    'before_what_hurdle' : 1,
    'who_gets_this_fee' : 'AAAAA',
    'percentage_or_cash' : 2000,
    'type_transaction' : 'cash',
    'type_of_fee' : 'catch_up'},
    type: "",
    id: 3       },
    {     value: {'year' : 1,
    'before_what_hurdle' : 1,
    'who_gets_this_fee' : 'BBBBB',
    'percentage_or_cash' : .04,
    'type_transaction' : 'percentage',
    'type_of_fee' : 'catch_up'},
    type: "",
    id: 4      }
          ];