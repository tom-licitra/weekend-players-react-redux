const express = require('express');
const app = express();
const path = require('path');
const { Player, syncAndSeed } = require('./db');

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/players', (req, res, next) => {
  Player.findAll()
    .then( players => res.send(players))
})

const init = () => {
  syncAndSeed();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, console.log(`App listening on port ${PORT}`))
}

init();
