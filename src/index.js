import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import reportWebVitals from './reportWebVitals';

// import main page
import MainApplication from "./components/main"; 



// display website content 
ReactDOM.render(
    <MainApplication/>,
  document.getElementById('root')
);
reportWebVitals();
