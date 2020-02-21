import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { IdContext } from './app';

const Header = props => {
  const id = React.useContext(IdContext);

  React.useEffect(
    () => {
      if (!id.id && props.location.pathname[1] !== 'a') props.history.push('/account');
    }
  );

  const createButton = () => {
    if (id.id) {
      return <button type='button' className='btn btn-outline-danger'
        onClick={
          () => {
            sessionStorage.removeItem('id');
            id.setId(null);
          }
        }>Log Out</button>;
    } else {
      return <button type='button' className='btn btn-outline-success'
        onClick={
          () => props.history.push('/account')
        }>Log In</button>;
    }
  };

  return (
    <header>
      <nav className='navbar navbar-dark bg-dark h-100'>
        <Link to='/' className='navbar-brand'>Ascend</Link>
        <ul className="nav">
          <li className="nav-item">
            <Link to='/' className='nav-link'>Route</Link>
          </li>
          <li className="nav-item">
            <Link to='/stat' className='nav-link'>Stat</Link>
          </li>
        </ul>
        {createButton()}
      </nav>
    </header>
  );
};

export default withRouter(Header);
