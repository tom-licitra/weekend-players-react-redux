import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ players, bestShooters, selectedPage }) => {
  return (
    <div id="nav">
      <h1>Acme Players with Shooting Percentages</h1>
      <hr />
      <ul>
        <li><Link to="/players">Players ({players.length})</Link></li>
        <li><Link to="/best-shooters">Best Shooter ({bestShooters.length === 1 ? bestShooters[0].name : `${bestShooters.length} players`})</Link></li>
      </ul>
      <hr />
    </div>
  )
}

const mapStateToProps = (state) => ({
  players: state.players,
  bestShooters: state.bestShooters,
  selectedPage: state.selectedPage
})

export default connect(mapStateToProps)(Nav);
