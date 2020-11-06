import { combineReducers } from 'redux';

import settingsReducer from './settings/settings-reducer'
import masterReducer from "./master/master-reducer";

export default combineReducers({
    settings: settingsReducer,
    master: masterReducer
});