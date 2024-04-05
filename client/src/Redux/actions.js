// actions.js
export const FETCH_MATCH_DATA_REQUEST = 'FETCH_MATCH_DATA_REQUEST';
export const FETCH_MATCH_DATA_SUCCESS = 'FETCH_MATCH_DATA_SUCCESS';
export const FETCH_MATCH_DATA_FAILURE = 'FETCH_MATCH_DATA_FAILURE';

export const fetchMatchDataRequest = () => ({ type: FETCH_MATCH_DATA_REQUEST });
// export const fetchMatchDataSuccess = (data) => ({ type: FETCH_MATCH_DATA_SUCCESS, payload: data });
export const fetchMatchDataSuccess = (summonerNames, championIds, 
  item0, item1, item2, item3, item4, item5, item6,
  kills, deaths, assists) => ({
    type: FETCH_MATCH_DATA_SUCCESS,
    payload: { summonerNames, championIds, item0, item1, item2, item3, item4, item5, item6, kills, deaths, assists},
  });
export const fetchMatchDataFailure = (error) => ({ type: FETCH_MATCH_DATA_FAILURE, payload: error });
