import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./root-reducer";

import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = []; // no middleware

// Reference: https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
// const composeEnhancer = window ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose; // this is a bug

const enhancer = composeWithDevTools(applyMiddleware(...middleware));

export const store = createStore(rootReducer, enhancer);
export const persistor = persistStore(store); // Reference: https://www.npmjs.com/package/redux-persist
export default { store, persistor };
