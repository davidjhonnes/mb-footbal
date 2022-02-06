import * as constants from '../../constants/seasons/index';

const initialState = {
    isFetching: false,
    seasonSelected:null
};

export default function seasonsReducer(state = initialState, action) {
  switch (action.type) {
    case constants.FETCHING_SEASONS:
      return {
        ...state,
        isFetching: action.payload,
      };
      case constants.SET_SEASON_SELECTED:
        return {
          ...state,
          seasonSelected: action.payload,
        };
  
    default:
      return state;
  }
}
