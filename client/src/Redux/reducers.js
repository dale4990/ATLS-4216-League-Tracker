// reducers.js
import { combineReducers } from 'redux';
import { FETCH_MATCH_DATA_REQUEST, FETCH_MATCH_DATA_SUCCESS, FETCH_MATCH_DATA_FAILURE } from './actions';

const initialState = {
  matchData: [],
  loading: false,
  error: null,
};

const matchDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MATCH_DATA_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MATCH_DATA_SUCCESS:
      return { ...state, loading: false, matchData: action.payload };
    case FETCH_MATCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  matchData: matchDataReducer,
});
