import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from './reducers';

const saveStateToAsyncStorage = store => next => action => {
 // console.groupCollapsed(action.type);
  // console.info('state before', store.getState());
  // console.info('dispatching', action);

  let result = next(action);
  // state after action
  let state = store.getState();
  // state to save on async storage
  let stateToSave = (({ leagues, season, teams }) => ({
    leagues,
    season,
    teams
  }))(state);

  AsyncStorage.setItem('state', JSON.stringify(stateToSave));
//   AsyncStorage.setItem('auth', JSON.stringify(state?.auth));

  // console.info('next state', state);
  // console.groupEnd();
  return result;
};

export default () => {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(saveStateToAsyncStorage)));

  return { store };
};
