import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import albumsReducer from './albumsReducer.js';
import photosReducer from './photosReducer.js';
import sessionReducer from './sessionReducer.js';


/******************************* REDUCER *********************************/
const rootReducer = combineReducers({
  session: sessionReducer,
  photos: photosReducer,
  albums: albumsReducer,
});


/*********************** CONDITIONAL COMPONENTS **************************/
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


/******************************** EXPORTS ********************************/
export default configureStore;
