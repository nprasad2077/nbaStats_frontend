import { createSlice } from "@reduxjs/toolkit";
import * as playerDataActions from "../constants/playerDataConstants";

const initialState = {
  playerData: [],
  loading: false,
  error: null,
};

const playerDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case playerDataActions.FETCH_PLAYER_DATA_START:
      return { ...state, loading: true, error: null };

    case playerDataActions.FETCH_PLAYER_DATA_SUCCESS:
      return { ...state, loading: false, playerData: action.payload };

    case playerDataActions.FETCH_PLAYER_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default playerDataReducer;
