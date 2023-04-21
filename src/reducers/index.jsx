// Create Reducers: functions that take the current state and action, and return a brand new state.
import { combineReducers } from "redux";
import playerDataReducer from "./playerDataReducer";

const rootReducer = combineReducers({
  playerData: playerDataReducer,
});

export default rootReducer;
