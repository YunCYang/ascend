import React from 'react';
import { Link, Route } from 'react-router-dom';
import RouteLog from './routeLog';
import RouteAdd from './routeAdd';
import RouteSearch from './routeSearch';

const RRoute = () => {
  const [path, setPath] = React.useState('/account');

  return (
    <div className='container section route'>
      <ul className="nav nav-pills justify-content-center">
        <li className="nav-item mx-1 my-3">
          <Link to='/' className={`nav-link font-weight-bold ${path === '/' ? 'active' : ''}`}>View</Link>
        </li>
        <li className="nav-item mx-1 my-3">
          <Link to='/add' className={`nav-link font-weight-bold ${path === '/add' ? 'active' : ''}`}>Add Route</Link>
        </li>
        <li className="nav-item mx-1 my-3">
          <Link to='/search' className={`nav-link font-weight-bold ${path === '/search' ? 'active' : ''}`}>Search</Link>
        </li>
      </ul>
      <Route exact path='/' render={() => <RouteLog setPath={setPath} />} />
      <Route path='/add' render={() => <RouteAdd setPath={setPath} />} />
      <Route path='/search' render={() => <RouteSearch setPath={setPath} />} />
    </div>
  );
};

export default RRoute;
