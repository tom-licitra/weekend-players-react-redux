import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store, { getPlayers, setPage } from './store';
import Nav from './Nav';
import Players from './Players';
import BestShooters from './BestShooters';

class Main extends Component {

  componentDidMount () {
    store.dispatch(setPage(window.location.hash.split("/").pop()));
    store.dispatch(getPlayers());
  }

  render () {
    return (
    <Provider store={ store }>
      <Router>
      <div>
        <Nav />
        <Route path="/players" component={Players} />
        <Route path="/best-shooters" component={BestShooters} />
      </div>
      </Router>
    </Provider>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById("root")
)
