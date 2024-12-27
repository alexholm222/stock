import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root_stock'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
