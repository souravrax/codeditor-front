import { combineReducers } from 'redux';

import settingsReducer from './settings/settings-reducer'

export default combineReducers({
    settings: settingsReducer
});