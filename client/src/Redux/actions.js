// actions.js
export const FETCH_MATCH_DATA_REQUEST = 'FETCH_MATCH_DATA_REQUEST';
export const FETCH_MATCH_DATA_SUCCESS = 'FETCH_MATCH_DATA_SUCCESS';
export const FETCH_MATCH_DATA_FAILURE = 'FETCH_MATCH_DATA_FAILURE';

export const fetchMatchDataRequest = () => ({ type: FETCH_MATCH_DATA_REQUEST });
export const fetchMatchDataSuccess = (data) => ({ type: FETCH_MATCH_DATA_SUCCESS, payload: data });
export const fetchMatchDataFailure = (error) => ({ type: FETCH_MATCH_DATA_FAILURE, payload: error });
