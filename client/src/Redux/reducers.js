// reducers.js
import { combineReducers } from 'redux';
import { FETCH_MATCH_DATA_REQUEST, FETCH_MATCH_DATA_SUCCESS, FETCH_MATCH_DATA_FAILURE } from './actions';

const initialState = {
  matchData: [],
  summonerNames: [],
  championIds: [],
  item0: [],
  item1: [],
  item2: [],
  item3: [],
  item4: [],
  item5: [],
  item6: [],
  kills: [],
  deaths: [],
  assists: [],
  primaryRune: [],
  secondaryStyle: [],
  summoner1Id: [],
  summoner2Id: [],
  loading: false,
  error: null,
};

const matchDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MATCH_DATA_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MATCH_DATA_SUCCESS:
      const {matchData, summonerNames, championIds, item0, item1, item2, item3, item4, item5, item6, kills, deaths, assists, primaryRune, secondaryStyle, summoner1Id, summoner2Id} = action.payload;
      return { ...state, loading: false, matchData, summonerNames, championIds, item0, item1, item2, item3, item4, item5, item6, kills, deaths, assists, primaryRune, secondaryStyle, summoner1Id, summoner2Id};
    case FETCH_MATCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};



// const matchDataReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_MATCH_DATA_REQUEST:
//       return { ...state, loading: true, error: null };
//     case FETCH_MATCH_DATA_SUCCESS:
//       return { ...state, loading: false, matchData: action.payload };
//     case FETCH_MATCH_DATA_FAILURE:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

export default combineReducers({
  matchData: matchDataReducer,
});
