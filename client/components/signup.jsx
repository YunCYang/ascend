import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const SignUp = props => {
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [userNameValidation, setUserNameValidation] = React.useState(30);
  const [emailValidation, setEmailValidation] = React.useState(2);
  const [passwordValidation, setPasswordValidation] = React.useState(62);
  const [confirmPasswordValidation, setConfirmPasswordValidation] = React.useState(2);
  const [didSubmit, setDidSubmit] = React.useState(false);

  const length8Check = RegExp('(?=.{8,})');
  const length3Check = RegExp('(?=.{3,})');
  const ucCheck = RegExp('(?=.*[A-Z])');
  const lcCheck = RegExp('(?=.*[a-z])');
  const ecCheck = RegExp('(?=.*[A-Za-z])');
  const numberCheck = RegExp('(?=.*[0-9])');
  const spcCheck = RegExp('(?=.*[!@#$%^&*_=+-])');

  React.useEffect(
    () => props.setPath('/account/signup')
  );

  const checkIsValid = tempSubmit => {
    if (didSubmit || tempSubmit) {
      let userNameValCopy = userNameValidation;
      let emailValCopy = emailValidation;
      let passwordValCopy = passwordValidation;
      let confirmPasswordValCopy = confirmPasswordValidation;
      if (!userName) {
        userNameValCopy = 30;
        document.querySelector('#userName').className = 'form-control is-invalid';
      } else {
        userNameValCopy = userNameValCopy | 1;
        if (!ecCheck.test(document.querySelector('#userName').value)) {
          if (userNameValCopy & 2) userNameValCopy = userNameValCopy ^ 2;
          document.querySelector('#userName').className = 'form-control is-invalid';
        } else userNameValCopy = userNameValCopy | 2;
        if (spcCheck.test(document.querySelector('#userName').value)) {
          if (userNameValCopy & 4) userNameValCopy = userNameValCopy ^ 4;
          document.querySelector('#userName').className = 'form-control is-invalid';
        } else userNameValCopy = userNameValCopy | 4;
        if (!length3Check.test(document.querySelector('#userName').value)) {
          if (userNameValCopy & 8) userNameValCopy = userNameValCopy ^ 8;
          document.querySelector('#userName').className = 'form-control is-invalid';
        } else userNameValCopy = userNameValCopy | 8;
        userNameValCopy = userNameValCopy | 16;
      }
      if (!email) {
        emailValCopy = 2;
        document.querySelector('#email').className = 'form-control is-invalid';
      } else {
        emailValCopy = emailValCopy | 1;
        if (!document.querySelector('#email').checkValidity()) {
          if (emailValCopy & 2) emailValCopy = emailValCopy ^ 2;
          document.querySelector('#email').className = 'form-control is-invalid';
        } else emailValCopy = emailValCopy | 2;
      }
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
      setUserNameValidation(userNameValCopy);
      setEmailValidation(emailValCopy);
      setPasswordValidation(passwordValCopy);
      setConfirmPasswordValidation(confirmPasswordValCopy);
      if (userNameValCopy === 31) {
        document.querySelector('#userName').className = 'form-control';
      }
      if (emailValCopy === 3) {
        document.querySelector('#email').className = 'form-control';
      }
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
    if (document.querySelector('#userName').className !== 'form-control is-invalid' &&
        document.querySelector('#email').className !== 'form-control is-invalid' &&
        document.querySelector('#password').className !== 'form-control is-invalid' &&
        document.querySelector('#confirmPassword').className !== 'form-control is-invalid') {
      const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: userName,
          email: email,
          password: password
        })
      };
      fetch('/api/auth/signup', init)
        .then(res => res.json())
        .then(res => {
          if (res.status === 400) {
            let userNameValCopy = userNameValidation;
            if (userNameValCopy & 16) userNameValCopy = userNameValCopy ^ 16;
            setUserNameValidation(userNameValCopy);
            document.querySelector('#userName').className = 'form-control is-invalid';
          } else if (res.status === 201) {
            document.querySelector('#userName').className = 'form-control is-valid';
            document.querySelector('#email').className = 'form-control is-valid';
            document.querySelector('#password').className = 'form-control is-valid';
            document.querySelector('#confirmPassword').className = 'form-control is-valid';
            props.history.push('/');
          }
        });
    }
  };

  const userNameFeedback = () => {
    return (
      <>
        {!(userNameValidation & 1) ? <p>User name is required</p> : null}
        {!(userNameValidation & 2) ? <p>User name must include at least 1 english character</p> : null}
        {!(userNameValidation & 4) ? <p>User name must not include special characters</p> : null}
        {!(userNameValidation & 8) ? <p>User name must have more than 3 characters</p> : null}
        {!(userNameValidation & 16) ? <p>User name already exists</p> : null}
      </>
    );
  };

  const emailFeedback = () => {
    return (
      <>
        {!(emailValidation & 1) ? <p>Email is required</p> : null}
        {!(emailValidation & 2) ? <p>Email format is invalid</p> : null}
      </>
    );
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
        <h1>Sign Up</h1>
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
            onKeyPress={
              e => {
                if (e.key === 'Enter') {
                  checkIsValid(true);
                  setDidSubmit(true);
                }
              }
            } />
          <div className="invalid-feedback">
            {userNameFeedback()}
          </div>
        </div>
        <div className="form-group container w-25 mt-2">
          <label htmlFor="email">Email</label>
          <input type="email" className='form-control' name="email" id="email" required
            onChange={
              e => setEmail(e.target.value)
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
            {emailFeedback()}
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
        </div>
        <div className='container w-25 d-flex flex-column text-center mt-3'>
          <div>
            <button type='submit' className='btn btn-primary'>Sign Up</button>
          </div>
          <Link to='/account' className='mt-2'>Back to Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
