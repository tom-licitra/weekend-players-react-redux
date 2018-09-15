import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

// INITIAL STATE
const initialState = {
  players: [],
  bestShooters: [],
  selectedPlayer: {},
  selectedPage: ''
}

// HELPER FUNCTIONS
const getBestShooters = (players) => {
  return players.reduce( (bestShooters, player) => {
    if (bestShooters.length === 0 || player.shootingPct > bestShooters[0].shootingPct) {
      return [player]
    }
    else if (player.shootingPct === bestShooters[0].shootingPct) {
      bestShooters.push(player)
      return bestShooters
    }
    else { return bestShooters }
  },[])
}


// ACTION TYPES
const GET_PLAYERS = 'GET_PLAYERS';
const GET_BEST_SHOOTERS = 'GET_BEST_SHOOTERS';

// ACTION CREATORS & THUNKS
const _getPlayers = (players) => ({type: GET_PLAYERS, players});
const getPlayers = () => {
  return (dispatch) => {
    return axios.get('/api/players')
      .then( response => response.data)
      .then( players => dispatch(_getPlayers(players)))
  }
}


// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYERS:
      return {...state,
        players: action.players,
        bestShooters: getBestShooters(action.players)
      }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;

export {
  getPlayers
}
