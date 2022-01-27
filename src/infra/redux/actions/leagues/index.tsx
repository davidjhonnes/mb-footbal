import * as constants from '../../constants/leagues/index';

export const fetchingLeaguesAction = (fetching: Boolean) => ({
    type: constants.SET_LEAGUES_LOAD_DATA,
    payload: fetching
});

export const setLeaguesAction = (data) => ({
    type: constants.SET_LEAGUES_LOAD_DATA,
    payload: data
});

export const getLeaguesListAction = (list) => ({
    type: constants.GET_LIST_LEAGUES,
    payload: list
});

