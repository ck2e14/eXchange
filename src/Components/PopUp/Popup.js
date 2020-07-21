import React from 'react';
import './Popup-style.css';

const Popup = () => {

   return (
      <div className='testpop'>

         <div className="popup-content p1">
            Developed by Chris Kennedy <br/>
            I am actively seeking employment! 
         </div>

         <div className="popup-content">  

            <a href="https://www.linkedin.com/in/christopher-w-kennedy/" className="social-links"
               target="_blank"
               rel="noopener noreferrer" 
            >LinkedIn | </a>
            <a href="https://www.chriskennedy.live" 
            className="social-links"
            >| Portfolio</a>

         </div>

      </div>
   );
}

export default Popup;
