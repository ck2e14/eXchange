import React from 'react';
import './CurrencyRowStyle.css';

function CurrencyRow(props) {

   const {
      currencyOptions,
      selectedCurrency,
      onChangeCurrency,
      amount,
      onChangeAmount
   } = props   
     
   return (
      <div>
         
         <input 
            type="number" 
            className="input-field"
            onChange={onChangeAmount} 
            value={amount}
            placeholder="0.00"
         /> 

         <select 
            name="" 
            id="" 
            value={selectedCurrency} 
            onChange={onChangeCurrency} 
            className="dropdown-menu">
               {currencyOptions.map(option => {
               return <option key={option} className='dropdown-options' id={option} value={option}>{option}</option>
               })}

         </select>

      </div>
   );
}

export default CurrencyRow;
