import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './Components/CurrencyRow/CurrencyRow';
import Popup from './Components/PopUp/Popup';

const BASE_URL ="https://api.exchangeratesapi.io/latest"

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('GBP');
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState('EUR');
  const [amount, setAmount] = useState();
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [hovered, setHovered] = useState(false);

  let toAmount, fromAmount;
  if(amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    fromAmount = amount / exchangeRate
    toAmount = amount
  }
  
  useEffect(()=> {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => { 
      const firstCurrency = Object.keys(data.rates)[0]
      console.log(data)
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency('GBP')
      setToCurrency('EUR')
      setExchangeRate(data.rates[firstCurrency])
      setHovered(false)
    })
  }, [])

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null) {
    fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  const handleFromAmountChange = e => {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  const handleInAmountChange = e => {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  const handlePopupHover = () => {
    setHovered(true);
    setTimeout(() => {
      setHovered(false)
    }, 7500)
  }
  
  return (
    <div className='flex-container-to-center-popup'>

      { hovered ? <Popup /> : null }
      
      <div className="background-img-and-top-flex-container" >

        <div className="flex-content-container">  

          <div className="flex-content content-1" 
            id="colors">
              <div className="content-1-text" >
                e<span className='highlight-character'>X</span>change<span className='highlight-character'>:</span>
              </div>

          </div>
        
          <div className="flex-content content-2"
          onClick={handlePopupHover}
          >
            <CurrencyRow 
              
              currencyOptions={currencyOptions}
              selectedCurrency={fromCurrency}
              onChangeCurrency={e => setFromCurrency(e.target.value)}
              amount={fromAmount}
              onChangeAmount={handleFromAmountChange}
            />
          </div>
        
          <div className="flex-content content-3">
            =
          </div>
        
          <div className="flex-content content-4"
          onClick={handlePopupHover}
          >
            <CurrencyRow
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={e => setToCurrency(e.target.value)}
              amount={toAmount}
              onChangeAmount={handleInAmountChange}
            />
          </div>
        
          <div className="flex-content content-5">
            Live currency exchange rate calculator
          </div>
        </div>

        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"/>
              
       </div>

    </div>
  );
}

export default App;
