import { combineReducers } from 'redux';
import initAppReducer from './initApp/initAppReducer';
import leaguesReducer from './leagues/leaguesReducer';
import seasonsReducer from './seasons/seasonsRedurcer';


const rootReducer = combineReducers({
    initApp: initAppReducer,
    leagues: leaguesReducer,
    seasons:seasonsReducer,

});

export default rootReducer;
