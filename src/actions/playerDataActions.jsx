import axios from "axios";
import * as playerDataActions from "../constants/playerDataConstants";

export const fetchPlayerDataStart = () => ({
  type: playerDataActions.FETCH_PLAYER_DATA_START,
});

export const fetchPlayerDataSuccess = (playerData) => ({
  type: playerDataActions.FETCH_PLAYER_DATA_SUCCESS,
  payload: playerData,
});

export const fetchPlayerDataFailure = (error) => ({
  type: playerDataActions.FETCH_PLAYER_DATA_FAILURE,
  payload: error,
});

export const fetchPlayerDataPage = async (page, allData = []) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/playerdata/?page=${page}`
    );
    const data = response.data.results;
    if (data.length === 0) {
      return allData;
    } else {
      return await fetchPlayerDataPage(page + 1, allData.concat(data));
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchAllPlayerData = () => async (dispatch) => {
  dispatch(fetchPlayerDataStart());

  try {
    const allData = await fetchPlayerDataPage(1);
    dispatch(fetchPlayerDataSuccess(allData));
  } catch (error) {
    dispatch(fetchPlayerDataFailure(error));
  }
};
