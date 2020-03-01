import React from 'react';
import { gradeConversion } from './routeDetail';
import { IdContext } from './app';

const RouteAdd = props => {
  const id = React.useContext(IdContext);
  const getToday = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const todayTime = yyyy + '-' + mm + '-' + dd;
    return todayTime;
  };

  const [nameState, setNameState] = React.useState({
    value: '',
    isValid: true
  });
  const [gradeState, setGradeState] = React.useState({
    value: '',
    isValid: true
  });
  const [attemptState, setAttemptState] = React.useState({
    value: '',
    isValid: true
  });
  const [locationState, setLocationState] = React.useState({
    value: '',
    isValid: true
  });
  const [locationTypeState, setLocationTypeState] = React.useState({
    value: true,
    isValid: true
  });
  const [timeState, setTimeState] = React.useState({
    value: getToday(),
    isValid: true
  });
  const [angleState, setAngleState] = React.useState({
    value: '',
    isValid: true
  });
  const [noteState, setNoteState] = React.useState({
    value: '',
    isValid: true
  });

  const checkName = () => {
    if (!document.querySelector('#name').value) setNameState({ ...nameState, isValid: null });
    else setNameState({ ...nameState, isValid: true });
  };

  const checkGrade = () => {
    const gradeRegex = new RegExp('^(([v|V]([0-9]|1[0-7]))|([3-9])(([a|A]|[b|B]|[c|C])[+]?)?)$');
    if (!document.querySelector('#grade').value) setGradeState({ ...gradeState, isValid: null });
    else if (!gradeRegex.test(document.querySelector('#grade').value)) setGradeState({ ...gradeState, isValid: false });
    else setGradeState({ ...gradeState, isValid: true });
  };

  const checkAttempt = () => {
    const numRegex = new RegExp('^[1-9][0-9]*$');
    if (!document.querySelector('#attempt').value) setAttemptState({ ...attemptState, isValid: null });
    else if (!numRegex.test(document.querySelector('#attempt').value)) setAttemptState({ ...attemptState, isValid: false });
    else setAttemptState({ ...attemptState, isValid: true });
  };

  const checkLocation = () => {
    if (!document.querySelector('#location').value) setLocationState({ ...locationState, isValid: null });
    else setLocationState({ ...locationState, isValid: true });
  };

  const checkAngle = () => {
    const numRegex = new RegExp('^[1-9][0-9]*$');
    if (document.querySelector('#angle').value &&
      !numRegex.test(document.querySelector('#angle').value)) setAngleState({ ...angleState, isValid: false });
    else setAngleState({ ...angleState, isValid: true });
  };

  const clearInput = () => {
    setNameState({ value: '', isValid: true });
    setGradeState({ value: '', isValid: true });
    setAttemptState({ value: '', isValid: true });
    setLocationState({ value: '', isValid: true });
    setLocationTypeState({ value: true, isValid: true });
    setTimeState({ value: getToday(), isValid: true });
    setAngleState({ value: '', isValid: true });
    setNoteState({ value: '', isValid: true });
  };

  const processGrade = () => {
    if (gradeState.value) {
      const combinedGrade = gradeConversion(gradeState.value);
      if (isNaN(combinedGrade[2])) return combinedGrade[1];
      else return combinedGrade[1] + combinedGrade[2];
    }
  };

  const handleSubmit = () => {
    checkName();
    checkGrade();
    checkAttempt();
    checkLocation();
    checkAngle();
    if (nameState.isValid && gradeState.isValid && attemptState.isValid &&
      locationState.isValid && angleState.isValid) {
      const init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: id.id,
          name: nameState.value,
          grade: processGrade(),
          attempt: attemptState.value,
          location: locationState.value,
          locationType: locationTypeState.value,
          completed: timeState.value || getToday(),
          angle: angleState.value ? angleState.value : 'null',
          note: noteState.value
        })
      };
      fetch('/api/route/add', init)
        .then(res => res.json())
        .then(res => clearInput());
    }
  };

  React.useEffect(
    () => props.setPath('/route/add')
  );

  return (
    <div className="container py-2">
      <div className="container w-75">
        <form className="needs-validation" noValidate>
          <div className='container row row-cols-1 row-cols-md-2'>
            <div className='form-group col mb-4'>
              <input type="text" name="name" id="name"
                className={!nameState.isValid ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                placeholder='Route Name' value={nameState.value} onChange={
                  e => setNameState({ ...nameState, value: e.target.value })
                } onBlur={
                  () => checkName()
                }/>
              <div className={`invalid-feedback ${nameState.isValid ? ' d-none' : ''}`}>
                <span>Route name is required</span>
              </div>
            </div>
            <div className="col mb-4">
              <div className="btn-group pt-2" role='group'>
                <button type='button' className='btn btn-success' onClick={
                  () => handleSubmit()
                }>Add</button>
                <button type='button' className='btn btn-secondary' onClick={
                  () => clearInput()
                }>Cancel</button>
              </div>
            </div>
          </div>
          <div className="container row row-cols-1 row-cols-md-2">
            <div className='form-group col my-3 p-1 border-bottom border-secondary'>
              <input type="text" name="grade" id="grade"
                className={!gradeState.isValid ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                placeholder='Grade' value={gradeState.value} onChange={
                  e => setGradeState({ ...gradeState, value: e.target.value })
                } onBlur={
                  () => checkGrade()
                }/>
              <div className={`invalid-feedback ${!gradeState.isValid && gradeState.isValid !== false ? '' : ' d-none'}`}>
                <span>Grade is required</span>
              </div>
              <div className={`invalid-feedback ${!gradeState.isValid && gradeState.isValid === false ? '' : ' d-none'}`}>
                <span>Grade must be either V or Font scale</span>
              </div>
            </div>
            <div className='form-group col my-3 p-1 border-bottom border-secondary'>
              <input type="text" name="attempt" id="attempt"
                className={!attemptState.isValid ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                placeholder='# of attempts' value={attemptState.value} onChange={
                  e => setAttemptState({ ...attemptState, value: e.target.value })
                } onBlur={
                  () => checkAttempt()
                }/>
              <div className={`invalid-feedback ${!attemptState.isValid && attemptState.isValid !== false ? '' : ' d-none'}`}>
                <span>Number of attempts is required</span>
              </div>
              <div className={`invalid-feedback ${!attemptState.isValid && attemptState.isValid === false ? '' : ' d-none'}`}>
                <span>Number of attempts must be a positive integer</span>
              </div>
            </div>
          </div>
          <div className="container row row-cols-1 row-cols-md-2">
            <div className='form-group col my-3 p-1 border-bottom border-secondary'>
              <input type="text" name="location" id="location"
                className={!locationState.isValid ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                placeholder='Location' value={locationState.value} onChange={
                  e => setLocationState({ ...locationState, value: e.target.value })
                } onBlur={
                  () => checkLocation()
                }/>
              <div className={`invalid-feedback ${locationState.isValid ? ' d-none' : ''}`}>
                <span>Location is required</span>
              </div>
            </div>
            <div className='form-group col my-3 p-1 border-bottom border-secondary'>
              <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="locationType"
                  checked={locationTypeState.value} onChange={
                    e => setLocationTypeState({ ...locationTypeState, value: e.target.checked })
                  }/>
                <label className="custom-control-label" htmlFor="locationType">
                  {locationTypeState.value ? 'Outdoor' : 'Indoor'}
                </label>
              </div>
            </div>
          </div>
          <div className="container row row-cols-1 row-cols-md-2">
            <div className='form-group col my-3 p-1 border-bottom border-secondary'>
              <input type="date" name="time" id="time" className='form-control mt-2'
                value={timeState.value} onChange={
                  e => setTimeState({ ...timeState, value: e.target.value })
                }/>
            </div>
            <div className='form-group col my-3 p-1 border-bottom border-secondary'>
              <input type="text" name="angle" id="angle"
                className={!angleState.isValid ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                placeholder='Wall Angle' value={angleState.value} onChange={
                  e => setAngleState({ ...angleState, value: e.target.value })
                } onBlur={
                  () => checkAngle()
                }/>
              <div className={`invalid-feedback ${angleState.isValid ? ' d-none' : ''}`}>
                <span>Angle must be a positive integer</span>
              </div>
            </div>
          </div>
          <div className="container row">
            <div className="col p-1">
              <span>Notes:</span>
              <textarea name="note" id="note" className='form-control mt-2'
                value={noteState.value} onChange={
                  e => setNoteState({ ...noteState, value: e.target.value })
                }/>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RouteAdd;
