const express = require('express');
const app = express();
const path = require('path');
const { Player, syncAndSeed } = require('./db');
const faker = require('faker');

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

app.get('/api/players', (req, res, next) => {
  Player.findAll()
    .then( players => res.send(players))
})

app.post('/api/players', (req, res, next) => {
  const _name = faker.name.firstName();
  const _shootingPct = Math.floor(Math.random() * 100);
  Player.create({name: _name, shootingPct: _shootingPct})
    .then( player => res.send(player))
})

app.delete('/api/players/:id', (req, res, next) => {
  Player.findById(req.params.id)
    .then( player => player.destroy())
    .then( () => res.sendStatus(204))
})

const init = () => {
  syncAndSeed();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, console.log(`App listening on port ${PORT}`))
}

init();
