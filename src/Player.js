import React from 'react';

const Player = ({ player }) => {
  return (
    <div className="player">
      <h3>{player.name}</h3>
      <div className="shootingPct">
        Shooting Pct: {player.shootingPct}%
      </div>
      <hr />
    </div>
  )
}

export default Player
