import * as constants from '../../constants/leagues/index';

const initialState = {
    leagues: [],
    isFetching: false
};

export default function leaguesReducer(state = initialState, action) {
    switch (action.type) {
        case constants.SET_LEAGUES_LOAD_DATA:
            return {
                ...state,
                leagues: action.payload
            };
        case constants.FETCHING_LEAGUES_LIST:
            return {
                ...state,
                isFetching: action.payload
            };

        case constants.GET_LIST_LEAGUES:
            return {
                ...state
            };

        default:
            return state;
    }
}
