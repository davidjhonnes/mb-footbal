import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from './reducers';




const saveStateToAsyncStorage = store => next => action => {

  let result = next(action);
  // state after action
  let state = store.getState();
  // state to save on async storage
  let stateToSave = (({ leagues, seasons, teams }) => ({
    leagues,
    seasons,
    teams
  }))(state);
  AsyncStorage.setItem('state', JSON.stringify(stateToSave));

  return result;
};

export default () => {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(saveStateToAsyncStorage)));

  return { store };
};
