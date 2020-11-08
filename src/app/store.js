import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './root-reducer'

import { persistStore } from 'redux-persist'

import logger from 'redux-logger'

const middleware = [logger];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancer(applyMiddleware(...middleware));

export const store = createStore(rootReducer, enhancer);
export const persistor = persistStore(store);
export default { store, persistor };