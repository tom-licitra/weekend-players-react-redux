const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/react-redux', {
  logging: false
});

const Player = db.define('player', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shootingPct: {
    type: Sequelize.INTEGER
  }
})

const syncAndSeed = () => {
  db.sync({force: true})
    .then( () => {
      Player.create({name: "Michael", shootingPct: 80});
      Player.create({name: "Shaq", shootingPct: 45});
      Player.create({name: "Magic", shootingPct: 80});
    })
}

module.exports = {
  Player,
  syncAndSeed
}
