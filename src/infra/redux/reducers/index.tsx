import { combineReducers } from 'redux';
import initAppReducer from './initApp/initAppReducer';
import leaguesReducer from './leagues/leaguesReducer';


const rootReducer = combineReducers({
    initApp: initAppReducer,
    leagues: leaguesReducer

});

export default rootReducer;
