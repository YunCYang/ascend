import React from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = props => {
  const [email, setEmail] = React.useState('');
  const [emailValidation, setEmailValidation] = React.useState(6);
  const [didSubmit, setDidSubmit] = React.useState(false);

  React.useEffect(
    () => props.setPath('/account/reset')
  );

  const checkIsValid = tempSubmit => {
    if (didSubmit || tempSubmit) {
      let emailValCopy = emailValidation;
      if (!email) {
        emailValCopy = 6;
        document.querySelector('#email').className = 'form-control is-invalid';
      } else {
        emailValCopy = emailValCopy | 1;
        if (!document.querySelector('#email').checkValidity()) {
          if (emailValCopy & 2) emailValCopy = emailValCopy ^ 2;
          document.querySelector('#email').className = 'form-control is-invalid';
        } else emailValCopy = emailValCopy | 2;
        emailValCopy = emailValCopy | 4;
      }
      setEmailValidation(emailValCopy);
      if (emailValCopy === 7) {
        document.querySelector('#email').className = 'form-control';
      }
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    setDidSubmit(true);
    checkIsValid(true);
    if (document.querySelector('#email').className !== 'form-control is-invalid') {
      const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email
        })
      };
      fetch('/api/auth/reset', init)
        .then(res => res.json())
        .then(res => {
          checkIsValid(false);
          document.querySelector('#email').className = 'form-control is-valid';
        });
    }
  };

  const emailFeedback = () => {
    return (
      <>
        {!(emailValidation & 1) ? <p>Email is required</p> : null}
        {!(emailValidation & 2) ? <p>Email format is invalid</p> : null}
        {!(emailValidation & 4) ? <p>Email does not match with any account</p> : null}
      </>
    );
  };

  return (
    <div className='container py-2'>
      <div className="container text-center">
        <h1>Reset Password</h1>
      </div>
      <form className='needs-validation d-flex flex-column' noValidate onSubmit={submitHandler}>
        <div className="form-group container w-25 mt-3">
          <label htmlFor="email">Send a Email to Reset Password</label>
          <input type="email" className='form-control' id='email' name='email' required
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
          <div className="valid-feedback">
            <span>Email sent successfully!</span>
          </div>
        </div>
        <div className='container w-25 d-flex flex-column text-center mt-3'>
          <div>
            <button type='submit' className='btn btn-primary'>Send Reset Email</button>
          </div>
          <Link to='/account' className='mt-2'>Back to Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
