import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import LogIn from './login';
import SignUp from './signup';
import ResetPassword from './resetPassword';

const Account = props => {
  const [path, setPath] = React.useState('/account');

  return (
    <div className='container account'>
      <ul className="nav nav-pills justify-content-center">
        <li className="nav-item mx-1 my-3">
          <Link to='/account' className={`nav-link font-weight-bold ${path === '/account' ? 'active' : ''}`}>Log In</Link>
        </li>
        <li className="nav-item mx-1 my-3">
          <Link to='/account/signup' className={`nav-link font-weight-bold ${path === '/account/signup' ? 'active' : ''}`}>Sign Up</Link>
        </li>
        <li className="nav-item mx-1 my-3">
          <Link to='/account/reset' className={`nav-link font-weight-bold ${path === '/account/reset' ? 'active' : ''}`}>Reset Password</Link>
        </li>
      </ul>
      <Route exact path='/account' render={() => <LogIn setPath={setPath} />} />
      <Route path='/account/signup' render={() => <SignUp setPath={setPath} />} />
      <Route path='/account/reset' render={() => <ResetPassword setPath={setPath} />} />
    </div>
  );
};

export default withRouter(Account);
