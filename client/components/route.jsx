import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import RouteLog from './routeLog';
import RouteAdd from './routeAdd';
import RouteDetail from './routeDetail';

const RRoute = props => {
  const [path, setPath] = React.useState('/route');

  return (
    <div className='container section route'>
      <ul className="nav nav-pills justify-content-center">
        <li className="nav-item mx-1 my-3">
          <Link to='/route' className={`nav-link font-weight-bold ${path === '/route' ? 'active' : ''}`}>View</Link>
        </li>
        <li className="nav-item mx-1 my-3">
          <Link to='/route/add' className={`nav-link font-weight-bold ${path === '/route/add' ? 'active' : ''}`}>Add Route</Link>
        </li>
      </ul>
      <Route exact path='/route' render={() => <RouteLog setPath={setPath} />} />
      <Route path='/route/add' render={() => <RouteAdd setPath={setPath} />} />
      <Route path={'/route/detail/:routeId'} render={({ match }) => <RouteDetail routeId={match.params.routeId} setPath={setPath} />} />
    </div>
  );
};

export default withRouter(RRoute);
