import React from 'react';
import { Link } from 'react-router-dom';

const UpdatePassword = props => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordValidation, setPasswordValidation] = React.useState(62);
  const [confirmPasswordValidation, setConfirmPasswordValidation] = React.useState(2);
  const [didSubmit, setDidSubmit] = React.useState(false);

  const length8Check = RegExp('(?=.{8,})');
  const ucCheck = RegExp('(?=.*[A-Z])');
  const lcCheck = RegExp('(?=.*[a-z])');
  const numberCheck = RegExp('(?=.*[0-9])');
  const spcCheck = RegExp('(?=.*[!@#$%^&*_=+-])');

  React.useEffect(
    () => props.setPath('/account/password/reset')
  );

  const checkIsValid = tempSubmit => {
    if (didSubmit || tempSubmit) {
      let passwordValCopy = passwordValidation;
      let confirmPasswordValCopy = confirmPasswordValidation;
      if (!password) {
        passwordValCopy = 62;
        document.querySelector('#password').className = 'form-control is-invalid';
      } else {
        passwordValCopy = passwordValCopy | 1;
        if (!ucCheck.test(document.querySelector('#password').value)) {
          if (passwordValCopy & 2) passwordValCopy = passwordValCopy ^ 2;
          document.querySelector('#password').className = 'form-control is-invalid';
        } else passwordValCopy = passwordValCopy | 2;
        if (!lcCheck.test(document.querySelector('#password').value)) {
          if (passwordValCopy & 4) passwordValCopy = passwordValCopy ^ 4;
          document.querySelector('#password').className = 'form-control is-invalid';
        } else passwordValCopy = passwordValCopy | 4;
        if (!numberCheck.test(document.querySelector('#password').value)) {
          if (passwordValCopy & 8) passwordValCopy = passwordValCopy ^ 8;
          document.querySelector('#password').className = 'form-control is-invalid';
        } else passwordValCopy = passwordValCopy | 8;
        if (!spcCheck.test(document.querySelector('#password').value)) {
          if (passwordValCopy & 16) passwordValCopy = passwordValCopy ^ 16;
          document.querySelector('#password').className = 'form-control is-invalid';
        } else passwordValCopy = passwordValCopy | 16;
        if (!length8Check.test(document.querySelector('#password').value)) {
          if (passwordValCopy & 32) passwordValCopy = passwordValCopy ^ 32;
          document.querySelector('#password').className = 'form-control is-invalid';
        } else passwordValCopy = passwordValCopy | 32;
      }
      if (!confirmPassword) {
        confirmPasswordValCopy = 2;
        document.querySelector('#confirmPassword').className = 'form-control is-invalid';
      } else {
        confirmPasswordValCopy = confirmPasswordValCopy | 1;
        if (confirmPassword !== password) {
          if (confirmPasswordValCopy & 2) confirmPasswordValCopy = confirmPasswordValCopy ^ 2;
          document.querySelector('#confirmPassword').className = 'form-control is-invalid';
        } else confirmPasswordValCopy = confirmPasswordValCopy | 2;
      }
      setPasswordValidation(passwordValCopy);
      setConfirmPasswordValidation(confirmPasswordValCopy);
      if (passwordValCopy === 63) {
        document.querySelector('#password').className = 'form-control';
      }
      if (confirmPasswordValCopy === 3) {
        document.querySelector('#confirmPassword').className = 'form-control';
      }
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    setDidSubmit(true);
    checkIsValid(true);
    if (document.querySelector('#password').className !== 'form-control is-invalid' &&
      document.querySelector('#confirmPassword').className !== 'form-control is-invalid') {
      const init = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: parseInt(props.userId),
          password: password,
          token: props.token
        })
      };
      fetch('/api/auth/update', init)
        .then(res => res.json())
        .then(res => {
          checkIsValid(false);
          document.querySelector('#password').className = 'form-control is-valid';
          document.querySelector('#confirmPassword').className = 'form-control is-valid';
        });
    }
  };

  const passwordFeedback = () => {
    return (
      <>
        {!(passwordValidation & 1) ? <p>Password is required</p> : null}
        {!(passwordValidation & 2) ? <p>Password must have at least 1 uppercase character</p> : null}
        {!(passwordValidation & 4) ? <p>Password must have at least 1 lowercase character</p> : null}
        {!(passwordValidation & 8) ? <p>Password must have at least 1 number</p> : null}
        {!(passwordValidation & 16) ? <p>Password must have at least 1 special character</p> : null}
        {!(passwordValidation & 32) ? <p>Password must have more than 8 characters</p> : null}
      </>
    );
  };

  const confirmPasswordFeedback = () => {
    return (
      <>
        {!(confirmPasswordValidation & 1) ? <p>Password confirmation is required</p> : null}
        {!(confirmPasswordValidation & 2) ? <p>Password confirmation must be the same as the original password</p> : null}
      </>
    );
  };

  return (
    <div className='container py-2'>
      <div className="container text-center">
        <h1>Update Password</h1>
      </div>
      <form className='needs-validation d-flex flex-column' noValidate onSubmit={submitHandler}>
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
            } />
          <div className="invalid-feedback">
            {passwordFeedback()}
          </div>
        </div>
        <div className="form-group container w-25 mt-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" className='form-control' name="confirmPassword" id="confirmPassword" required
            onChange={
              e => setConfirmPassword(e.target.value)
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
            } />
          <div className="invalid-feedback">
            {confirmPasswordFeedback()}
          </div>
          <div className="valid-feedback">
            <span>Password Updated</span>
          </div>
        </div>
        <div className='container w-25 d-flex flex-column text-center mt-3'>
          <div>
            <button type='submit' className='btn btn-primary'>Update Password</button>
          </div>
          <Link to='/account' className='mt-2'>Back to Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
