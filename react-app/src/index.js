import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { TripProvider } from './context/Trip';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <TripProvider>
      <Provider store={store}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </Provider>
    </TripProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
