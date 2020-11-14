import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'; // localStorage

import settingsReducer from './settings/settings-reducer'
import masterReducer from "./master/master-reducer";

// ============ CONFIGURATION ==================
const rootPersistConfig = {
    key: 'root',
    storage: storage,
} // Configuration for the root reducer

const masterPersistConfig = {
    key: 'master',
    storage: storage,
    blacklist: ['output']
} // Configuration for the master reducer 
// ============ CONFIGURATION ENDS ==================

// Combining the reducers
const rootReducer = combineReducers({
    settings: settingsReducer,
    master: persistReducer(masterPersistConfig, masterReducer),
}); // Original Root Reducer

const persistedReducer = persistReducer(rootPersistConfig, rootReducer); // Persisted Root Reducer
export default persistedReducer;