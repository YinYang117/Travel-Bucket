import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { TripProvider } from './context/Trip';
// import { Wrapper, Status } from "@googlemaps/react-wrapper";

const API_KEY = process.env.REACT_APP_MAPS_API_KEY;
const store = configureStore();

const render = (Status) => {
  return <h1>{Status}</h1>;
};

ReactDOM.render(
  <React.StrictMode>
    <TripProvider>
      {/* <Wrapper apiKey={API_KEY} render={render}> */}
        <Provider store={store}>
          <ModalProvider>
            <App />
          </ModalProvider>
        </Provider>
      {/* </Wrapper> */}
    </TripProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
