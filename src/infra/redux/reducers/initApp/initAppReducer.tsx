import * as constants from '../../constants/initApp/index';

const initialState = {
  storeInitialized: false,
};

export default function initAppReducer(state = initialState, action) {
  switch (action.type) {
    case constants.INIT_APP_INITIALIZED_STORE:
      return {
        ...state,
        storeInitialized: true,
      };

    default:
      return state;
  }
}
