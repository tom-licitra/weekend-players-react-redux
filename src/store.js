import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

// INITIAL STATE
const initialState = {
  players: [],
  bestShooters: [],
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
const DELETE_PLAYER = 'DELETE_PLAYER';
const ADD_PLAYER = 'ADD_PLAYER';
const SET_PAGE = 'SET_PAGE';


// ACTION CREATORS & THUNKS
const _getPlayers = (players) => ({type: GET_PLAYERS, players});
const getPlayers = () => {
  return (dispatch) => {
    return axios.get('/api/players')
      .then( response => response.data)
      .then( players => dispatch(_getPlayers(players)))
  }
}

const _deletePlayer = (player) => ({type: DELETE_PLAYER, player});
const deletePlayer = (player) => {
  return (dispatch) => {
    axios.delete(`/api/players/${player.id}`)
      .then( () => dispatch(_deletePlayer(player)))
  }
}

const _addPlayer = (player) => ({type: ADD_PLAYER, player});
const addPlayer = () => {
  return (dispatch) => {
    axios.post('/api/players')
      .then( response => response.data)
      .then( player => dispatch(_addPlayer(player)))
  }
}

const setPage = (pageName) => ({type: SET_PAGE, pageName});


// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYERS:
      return {...state,
        players: action.players,
        bestShooters: getBestShooters(action.players)
      }
    case DELETE_PLAYER:
      return {...state,
        players: state.players.filter( player => player.id !== action.player.id),
        bestShooters: getBestShooters(state.players.filter( player => player.id !== action.player.id))
      }
    case ADD_PLAYER:
      return {...state,
        players: [...state.players, action.player],
        bestShooters: getBestShooters([...state.players, action.player])
      }
    case SET_PAGE:
      return {...state, selectedPage: action.pageName}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;

export {
  getPlayers,
  deletePlayer,
  addPlayer,
  setPage
}
