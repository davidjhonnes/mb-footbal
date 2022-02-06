import * as constants from '../../constants/seasons/index';

export const fetchingSeasonsAction = (fetching: Boolean) => ({
    type: constants.FETCHING_SEASONS,
    payload: fetching
});

export const setSelectedSeasonAction = (data) => ({
    type: constants.SET_SEASON_SELECTED,
    payload: data
});



