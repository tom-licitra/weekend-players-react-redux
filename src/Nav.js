import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPage } from './store';

const Nav = ({ players, bestShooters, selectedPage, setPage }) => {
  return (
    <div id="nav">
      <h1>Acme Players with Shooting Percentages</h1>
      <hr />
      <ul>
        <li onClick={() => setPage('players')} style={{fontWeight: selectedPage === 'players' ? 'bold' : ''}}>
          <Link to="/players">Players ({players.length})</Link>
        </li>
        {
          !bestShooters.length ? null :
          <li onClick={() => setPage('best-shooters')} style={{fontWeight: selectedPage === 'best-shooters' ? 'bold' : ''}} >
            <Link to="/best-shooters">Best Shooter ({bestShooters.length === 1 ? bestShooters[0].name : `${bestShooters.length} players`})</Link>
          </li>
        }
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

const mapDispatchToProps = (dispatch) => ({
  setPage: (pageName) => dispatch(setPage(pageName))
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
