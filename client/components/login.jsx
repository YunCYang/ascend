import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { IdContext } from './app';

const LogIn = props => {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userNameValidation, setUserNameValidation] = React.useState('empty');
  const [passwordValidation, setPasswordValidation] = React.useState('empty');
  const [didSubmit, setDidSubmit] = React.useState(false);
  const id = React.useContext(IdContext);

  React.useEffect(
    () => props.setPath('/account')
  );

  const checkIsValid = (tempSubmit, status, resultId) => {
    if (didSubmit || tempSubmit) {
      if (!userName) {
        setUserNameValidation('empty');
        document.querySelector('#userName').className = 'form-control is-invalid';
      } else {
        document.querySelector('#userName').className = 'form-control';
      }
      if (!password) {
        setPasswordValidation('empty');
        document.querySelector('#password').className = 'form-control is-invalid';
      } else {
        document.querySelector('#password').className = 'form-control';
      }
      if (status === 404) {
        setUserNameValidation('no-match');
        document.querySelector('#userName').className = 'form-control is-invalid';
        document.querySelector('#password').className = 'form-control';
      } else if (status === 401) {
        setPasswordValidation('no-match');
        document.querySelector('#userName').className = 'form-control';
        document.querySelector('#password').className = 'form-control is-invalid';
      } else if (status === 200) {
        document.querySelector('#userName').className = 'form-control is-valid';
        document.querySelector('#password').className = 'form-control is-valid';
        id.setId(resultId);
        props.history.push('/');
      }
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    setDidSubmit(true);
    checkIsValid(true);
    if (userName && password) {
      const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: userName,
          password: password
        })
      };
      fetch('/api/auth/login', init)
        .then(res => res.json())
        .then(res => {
          sessionStorage.setItem('id', res.userId);
          checkIsValid(false, res.status, res.userId);
        });
    }
  };

  return (
    <div className='container py-2'>
      <div className="container text-center">
        <h1>Log In</h1>
      </div>
      <form className='needs-validation d-flex flex-column' noValidate onSubmit={submitHandler}>
        <div className="form-group container w-25 mt-3">
          <label htmlFor="userName">User Name</label>
          <input type="text" className='form-control' id='userName' name='userName' required
            onChange={
              e => setUserName(e.target.value)
            }
            onBlur={
              () => checkIsValid()
            }
            onKeyPress = {
              e => {
                if (e.key === 'Enter') {
                  checkIsValid(true);
                  setDidSubmit(true);
                }
              }
            }/>
          <div className="invalid-feedback">
            <span>{userNameValidation === 'empty'
              ? 'User name is required' : 'User name does not exist'}</span>
          </div>
        </div>
        <div className="form-group container w-25 mt-2">
          <label htmlFor="password">Password</label>
          <input type="password" className='form-control' name="password" id="password" required
            onChange={
              e => setPassword(e.target.value)
            }
            onBlur={
              () => checkIsValid()
            }
            onKeyPress={
              e => {
                if (e.key === 'Enter') {
                  checkIsValid(true);
                  setDidSubmit(true);
                }
              }
            }/>
          <div className="invalid-feedback">
            <span>{passwordValidation === 'empty'
              ? 'Password is required' : 'Password does not match'}</span>
          </div>
        </div>
        <div className='container w-25 d-flex flex-column text-center mt-3'>
          <div>
            <button type='submit' className='btn btn-primary'>Log In</button>
          </div>
          <Link to='/account/reset' className='mt-2'>Forgot password?</Link>
        </div>
      </form>
    </div>
  );
};

export default withRouter(LogIn);
