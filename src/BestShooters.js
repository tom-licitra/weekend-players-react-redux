import React from 'react'
import { connect } from 'react-redux';
import Player from './Player';

const BestShooters = ({ bestShooters }) => {
  return (
    <div id="bestShooters">
      {bestShooters.map(player => <Player key={player.id} player={player} />)}
    </div>
  )
}

const mapPropsToState = (state) => ({bestShooters: state.bestShooters});

export default connect(mapPropsToState)(BestShooters);
