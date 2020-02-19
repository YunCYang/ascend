import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
        <button type='button' className='btn btn-outline-danger'>Log Out</button>
      </nav>
    </header>
  );
};

export default Header;
