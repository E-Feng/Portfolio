import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Patreon from './pages/Patreon';

const maxWidth = 960;

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact path='/'
          render={props => <Home {...props} maxWidth={maxWidth} />}
        />
        <Route
          path='/projects'
          render={props => <Projects {...props} maxWidth={maxWidth} />}
        />
        <Route
          path='/about'
          render={props => <About {...props} maxWidth={maxWidth} />}
        />
        <Route 
          path='/patreon'
          render={props => <Patreon {...props} maxWidth={maxWidth} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
