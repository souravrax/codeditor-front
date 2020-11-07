import { createStore, applyMiddleware } from 'redux'
import rootReducer from './root-reducer'

import { persistStore } from 'redux-persist'

import logger from 'redux-logger'

const middleware = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);
export default { store, persistor };