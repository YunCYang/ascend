import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './header';
import RRoute from './route';
import Account from './account';
import Stat from './stat';

const App = () => {
  return (
    <Router>
      <Switch>
        <>
          <Header />
          <div className="main">
            <Route exact path="/" render={() => <RRoute />} />
            <Route exact path="/account" render={() => <Account />} />
            <Route exact path="/stat" render={() => <Stat /> } />
          </div>
        </>
      </Switch>
    </Router>
  );
};

export default App;
