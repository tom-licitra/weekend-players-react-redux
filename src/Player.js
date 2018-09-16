import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deletePlayer, setPage } from './store';

const Player = ({ player, bestShooters, deletePlayer, setPage }) => {
  return (
    <div className="player">
      <h3>{player.name}</h3>
      <div className="shootingPct">
        Shooting Pct: {player.shootingPct}%
      </div>
      <br />
      <Link to={bestShooters.length === 1 ? "/players" : "/best-shooters"}>
        <button type="button" onClick={() => {
          deletePlayer(player);
          setPage(bestShooters.length === 1 ? 'players' : 'best-shooters');
          }}> Delete Player
        </button>
      </Link>
      <hr />
    </div>
  )
}

const mapPropsToState = (state) => ({
  bestShooters: state.bestShooters
})

const mapDispatchToProps = (dispatch) => ({
  deletePlayer: (player) => dispatch(deletePlayer(player)),
  setPage: (pageName) => dispatch(setPage(pageName))
})

export default connect(mapPropsToState, mapDispatchToProps)(Player)
