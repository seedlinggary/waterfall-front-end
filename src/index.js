import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {reactLocalStorage} from 'reactjs-localstorage';

const root = ReactDOM.createRoot(document.getElementById('root'));
function getApiUrl() {
  // let frontend = '';
  // reactLocalStorage.set('frontend', frontend)
  // let frontend = reactLocalStorage.get('frontend')
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    reactLocalStorage.set('backendApi', 'http://localhost:5000'); // Localhost API URL
  } else {
    reactLocalStorage.set('BackendApi', 'https://distributionresolutionapi.com'); // Production API URL
  }
}
getApiUrl()
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
