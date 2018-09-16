import React from 'react';
import { connect } from 'react-redux'
import { deletePlayer, addPlayer } from './store'

const Players = ({ players, deletePlayer, addPlayer }) => {
  return (
    <div>
      <button type="button" onClick={addPlayer}>Add new player</button>
      <div id="players">
        <ul>
          {
            players.map(player => <li key={player.id}>{player.name}: {player.shootingPct}%  <button type="button" onClick={() => deletePlayer(player)}>X</button></li>)
          }
        </ul>
        <hr />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {players: state.players}
}

const mapDispatchToProps = (dispatch) => ({
  deletePlayer: (player) => dispatch(deletePlayer(player)),
  addPlayer: () => dispatch(addPlayer())
})

export default connect(mapStateToProps, mapDispatchToProps)(Players);
