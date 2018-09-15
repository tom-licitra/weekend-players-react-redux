import React from 'react';
import { connect } from 'react-redux'

const Players = ({ players }) => {
  return (
    <div>
      <button type="button">Add new player</button>
      <div id="players">
        <ul>
          {players.map(player => <li key={player.id}>{player.name}: {player.shootingPct}%</li>)}
        </ul>
        <hr />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log("Calling MSTP in Players");
  console.log(state);
  return {players: state.players}
}

export default connect(mapStateToProps)(Players);
