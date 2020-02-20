import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './header';
import RRoute from './route';
import Account from './account';
import Stat from './stat';

export const IdContext = React.createContext(null);

const App = () => {
  const [id, setId] = React.useState(null);

  return (
    <IdContext.Provider value={{ id, setId }}>
      <Router>
        <Switch>
          <>
            <Header />
            <div className="main">
              <Route exact path="/" render={() => <RRoute />} />
              <Route path="/account" render={() => <Account />} />
              <Route path="/stat" render={() => <Stat />} />
            </div>
          </>
        </Switch>
      </Router>
    </IdContext.Provider>
  );
};

export default App;
