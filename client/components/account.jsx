import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import LogIn from './login';
import SignUp from './signup';
import ResetPassword from './resetPassword';
import UpdatePassword from './updatePassword';

const Account = props => {
  const [path, setPath] = React.useState('/account');

  return (
    <div className='container section account'>
      <ul className="nav nav-pills justify-content-center">
        <li className="nav-item mx-1 my-3">
          <Link to='/account' className={`nav-link font-weight-bold ${path === '/account' ? 'active' : ''}`}>Log In</Link>
        </li>
        <li className="nav-item mx-1 my-3">
          <Link to='/account/signup' className={`nav-link font-weight-bold ${path === '/account/signup' ? 'active' : ''}`}>Sign Up</Link>
        </li>
      </ul>
      <Route exact path='/account' render={() => <LogIn setPath={setPath} />} />
      <Route path='/account/signup' render={() => <SignUp setPath={setPath} />} />
      <Route path='/account/reset' render={() => <ResetPassword setPath={setPath} />} />
      <Route path={'/account/password/reset/:userId/:token'} render={({ match }) => <UpdatePassword userId={match.params.userId} token={match.params.token} setPath={setPath}/>} />
    </div>
  );
};

export default withRouter(Account);
