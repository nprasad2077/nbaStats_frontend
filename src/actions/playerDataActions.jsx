import * as playerDataActions from '../constants/playerDataConstants'

export const fetchPlayerDataStart = () => ({
    type: playerDataActions.FETCH_PLAYER_DATA_START,
})

export const fetchPlayerDataSuccess = (playerData) => ({
    type: playerDataActions.FETCH_PLAYER_DATA_SUCCESS,
    payload: playerData,
})

export const fetchPlayerDataFailure = (error) => ({
 type: playerDataActions.FETCH_PLAYER_DATA_FAILURE,
 payload: error,
})