import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { ProfileModalProvider } from './context/ProfileModal';
import { AboutModalProvider } from './context/AboutModal';
import { TripProvider } from './context/Trip';

const store = configureStore();

const render = (Status) => {
  return <h1>{Status}</h1>;
};

ReactDOM.render(
  <React.StrictMode>
    <TripProvider>
        <Provider store={store}>
          <ModalProvider>
            <ProfileModalProvider>
              <AboutModalProvider>
                <App />
              </AboutModalProvider>
            </ProfileModalProvider>
          </ModalProvider>
        </Provider>
    </TripProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
