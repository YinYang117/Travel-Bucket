import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import tripsReducer from './trip';
import notesReducer from './note';
import invitedUsersReducer from './invited_user';
import eventsReducer from './event';
import map from './map'

const rootReducer = combineReducers({
  session,
  map,
  trips: tripsReducer,
  notes: notesReducer,
  invited: invitedUsersReducer,
  events: eventsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
