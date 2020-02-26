import React from 'react';
import { IdContext } from './app';

export const gradeConversion = grade => {
  const twoScales = { v: null, font: null };
  if (!grade && grade !== 0) return null;
  else {
    const vCheck = RegExp('^[v|V]([b|B]|0|[1-9][0-9]*)$');
    const fontCheck = RegExp('^(0|[1-9][0-9]*)(([a|A]|[b|B]|[c|C])[+]?)?$');
    if (vCheck.test(grade)) {
      twoScales.v = grade.toString().toUpperCase();
      switch (twoScales.v) {
        case 'VB':
          twoScales.font = '3';
          break;
        case 'V0':
          twoScales.font = '4';
          break;
        case 'V1':
          twoScales.font = '5A/5B';
          break;
        case 'V2':
          twoScales.font = '5C';
          break;
        case 'V3':
          twoScales.font = '6A/6A+';
          break;
        case 'V4':
          twoScales.font = '6B/6B+';
          break;
        case 'V5':
          twoScales.font = '6C/6C+';
          break;
        case 'V6':
          twoScales.font = '7A';
          break;
        case 'V7':
          twoScales.font = '7A+';
          break;
        case 'V8':
          twoScales.font = '7B/7B+';
          break;
        case 'V9':
          twoScales.font = '7B+/7C';
          break;
        case 'V10':
          twoScales.font = '7C+';
          break;
        case 'V11':
          twoScales.font = '8A';
          break;
        case 'V12':
          twoScales.font = '8A+';
          break;
        case 'V13':
          twoScales.font = '8B';
          break;
        case 'V14':
          twoScales.font = '8B+';
          break;
        case 'V15':
          twoScales.font = '8C';
          break;
        case 'V16':
          twoScales.font = '8C+';
          break;
        case 'V17':
          twoScales.font = '9A';
          break;
      }
    } else if (fontCheck.test(grade)) {
      twoScales.font = grade.toString().toUpperCase();
      if (twoScales.font.length === 1 && twoScales.font !== '3' && twoScales.font !== '4') {
        twoScales.font += 'A';
      }
      const fontCopy = twoScales.font;
      switch (fontCopy) {
        case '3':
        case '3A':
        case '3A+':
        case '3B':
        case '3B+':
        case '3C':
        case '3C+':
          twoScales.v = 'VB';
          twoScales.font = '3';
          break;
        case '4':
        case '4A':
        case '4A+':
        case '4B':
        case '4B+':
        case '4C':
        case '4C+':
          twoScales.v = 'V0';
          twoScales.font = '4';
          break;
        case '5A':
        case '5A+':
        case '5B':
        case '5B+':
          twoScales.v = 'V1';
          twoScales.font = '5A/5B';
          break;
        case '5C':
        case '5C+':
          twoScales.v = 'V2';
          twoScales.font = '5C';
          break;
        case '6A':
        case '6A+':
          twoScales.v = 'V3';
          twoScales.font = '6A/6A+';
          break;
        case '6B':
        case '6B+':
          twoScales.v = 'V4';
          twoScales.font = '6B/6B+';
          break;
        case '6C':
        case '6C+':
          twoScales.v = 'V5';
          twoScales.font = '6C/6C+';
          break;
        case '7A':
          twoScales.v = 'V6';
          break;
        case '7A+':
          twoScales.v = 'V7';
          break;
        case '7B':
        case '7B+':
          twoScales.v = 'V8';
          twoScales.font = '7B/7B+';
          break;
        case '7C':
          twoScales.v = 'V9';
          twoScales.font = '7B+/7C';
          break;
        case '7C+':
          twoScales.v = 'V10';
          break;
        case '8A':
          twoScales.v = 'V11';
          break;
        case '8A+':
          twoScales.v = 'V12';
          break;
        case '8B':
          twoScales.v = 'V13';
          break;
        case '8B+':
          twoScales.v = 'V14';
          break;
        case '8C':
          twoScales.v = 'V15';
          break;
        case '8C+':
          twoScales.v = 'V16';
          break;
        case '9A':
          twoScales.v = 'V17';
          break;
      }
    } else return 'wrong format';
    if (twoScales.v && twoScales.font) return `${twoScales.v} | ${twoScales.font}`;
    else if (twoScales.v) return twoScales.v;
    else return twoScales.font;
  }
};

const RouteDetail = props => {
  const id = React.useContext(IdContext);
  const [routeInfo, setRouteInfo] = React.useState({});
  const [isEdit, setIsEdit] = React.useState(false);
  // const [gradeValidity, setGradeValidity] = React.useState(true);
  // const [attemptValidity, setAttemptValidity] = React.useState(true);
  // const [angleValidity, setAngleValidity] = React.useState(true);
  const [nameState, setNameState] = React.useState({
    value: routeInfo.name,
    tempValue: '',
    isEdit: false
  });
  const [gradeState, setGradeState] = React.useState({
    value: routeInfo.grade,
    tempValue: '',
    isEdit: false
  });
  const [attemptState, setAttemptState] = React.useState({
    value: routeInfo.attempts,
    tempValue: '',
    isEdit: false
  });
  const [locationState, setLocationState] = React.useState({
    value: routeInfo.location,
    tempValue: '',
    isEdit: false
  });
  const [locationTypeState, setLocationTypeState] = React.useState({
    value: routeInfo.locationType,
    tempValue: false,
    isEdit: false
  });
  const [timeState, setTimeState] = React.useState({
    value: routeInfo.completed,
    tempValue: '',
    isEdit: false
  });
  const [angleState, setAngleState] = React.useState({
    value: routeInfo.angle,
    tempValue: '',
    isEdit: false
  });
  const [noteState, setNoteState] = React.useState({
    value: routeInfo.note,
    tempValue: '',
    isEdit: false
  });

  const attemptsConversion = () => {
    if (attemptState.value === 1 || attemptState.value === '1') return 'Flash';
    else return `${attemptState.value} tries`;
  };

  const showInOutdoor = () => {
    if (locationTypeState.value) return 'Outdoor';
    else return 'Indoor';
  };

  const formatDate = () => {
    if (timeState.value) {
      const timeArray = timeState.value.split('');
      const dateArray = timeArray.slice(0, 10).join('').split('-');
      const usDateArray = [];
      usDateArray.push(dateArray[1]);
      usDateArray.push('/');
      usDateArray.push(dateArray[2]);
      usDateArray.push('/');
      usDateArray.push(dateArray[0]);
      return usDateArray.join('');
    } else return null;
  };

  const renderButton = () => {
    if (isEdit) {
      return (
        <>
          <button type='button' className='btn btn-success' onClick={
            e => submitHandler(e)
          }>Confirm</button>
          <button type='button' className='btn btn-secondary' onClick={
            () => resetEdit()
          }>Cancel</button>
        </>
      );
    } else {
      return (
        <>
          <button type='button' className='btn btn-info' onClick={
            () => setIsEdit(true)
          }>Edit</button>
          <button type='button' className='btn btn-danger'>Delete</button>
        </>
      );
    }
  };

  const toggleTextInput = (elem1, elem2, state) => {
    if (isEdit && state.isEdit) return elem2;
    else return elem1;
  };

  const renderInput = (state, setState, placeholder, id) => {
    if (setState === setLocationTypeState) {
      return (
        <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id="locationType"
            checked={locationTypeState.value} onChange={
              e => setLocationTypeState({ ...locationTypeState, value: e.target.checked })
            }/>
          <label className="custom-control-label" htmlFor="locationType">
            {locationTypeState.value ? 'Outdoor' : 'Indoor'}
          </label>
        </div>
      );
    } else {
      return (
        <>
          <input type={setState === setTimeState ? 'date' : 'text'}
            className='form-control mt-2' value={state.tempValue}
            placeholder={placeholder} id={id} onChange={
              e => setState({ ...state, tempValue: e.target.value })
            } />
        </>
      );
    }
  };

  const resetEdit = () => {
    setIsEdit(false);
    if (nameState.isEdit) setNameState({ ...nameState, isEdit: false });
    if (gradeState.isEdit) setGradeState({ ...gradeState, isEdit: false });
    if (attemptState.isEdit) setAttemptState({ ...attemptState, isEdit: false });
    if (locationState.isEdit) setLocationState({ ...locationState, isEdit: false });
    if (locationTypeState.isEdit) setLocationTypeState({ ...locationTypeState, isEdit: false });
    if (timeState.isEdit) setTimeState({ ...timeState, isEdit: false });
    if (angleState.isEdit) setAngleState({ ...angleState, isEdit: false });
    if (noteState.isEdit) setNoteState({ ...noteState, isEdit: false });
  };

  const updateValue = () => {
    setIsEdit(false);
    const stateArray = [{ state: nameState, setState: setNameState },
      { state: gradeState, setState: setGradeState },
      { state: attemptState, setState: setAttemptState },
      { state: locationState, setState: setLocationState },
      { state: locationTypeState, setState: setLocationTypeState },
      { state: timeState, setState: setTimeState },
      { state: angleState, setState: setAngleState },
      { state: noteState, setState: setNoteState }];
    for (const item of stateArray) {
      if (item.state.isEdit || item.state.tempValue) {
        if (item.state.tempValue) {
          const tempCopy = item.state.tempValue;
          item.setState({
            value: tempCopy,
            tempValue: '',
            isEdit: false
          });
        } else {
          item.setState({
            ...item.state,
            isEdit: false
          });
        }
      }
    }
  };

  const compareRegexPattern = input => {
    const gradeCheck = RegExp('^(([v|V]([b|B]|0|[1-9][0-9]*))|((0|[1-9][0-9]*)(([a|A]|[b|B]|[c|C])[+]?)?))$');
    const numCheck = RegExp('^[1-9][0-9]*$');
    if (input === 'grade' && gradeState.isEdit) {
      if (!gradeCheck.test(document.querySelector('#grade').value)) {
        // setGradeValidity(false);
        document.querySelector('#grade').className = 'form-control mt-2 is-invalid';
        return false;
      } else {
        // setGradeValidity(true);
        document.querySelector('#grade').className = 'form-control mt-2';
        return true;
      }
    } else if (input === 'attempt' && attemptState.isEdit) {
      if (!numCheck.test(document.querySelector('#attempt').value)) {
        // setAttemptValidity(false);
        document.querySelector('#attempt').className = 'form-control mt-2 is-invalid';
        return false;
      } else {
        // setAttemptValidity(true);
        document.querySelector('#attempt').className = 'form-control mt-2';
        return true;
      }
    } else if (input === 'angle' && angleState.isEdit) {
      if (document.querySelector('#angle').value !== null &&
        !numCheck.test(document.querySelector('#angle').value)) {
        // setAngleValidity(false);
        document.querySelector('#angle').className = 'form-control mt-2 is-invalid';
        return false;
      } else {
        // setAngleValidity(true);
        document.querySelector('#angle').className = 'form-control mt-2';
        return true;
      }
    }
    return true;
  };

  const submitHandler = e => {
    e.preventDefault();
    const checkGrade = compareRegexPattern('grade');
    const checkAttempt = compareRegexPattern('attempt');
    const checkAngle = compareRegexPattern('angle');
    if (checkGrade && checkAttempt && checkAngle) updateValue();
  };

  React.useEffect(
    () => props.setPath('/route/detail')
  );

  React.useEffect(
    () => {
      if (id.id) {
        fetch(`/api/route/detail/${id.id}/${props.routeId}`)
          .then(res => res.json())
          .then(res => {
            setRouteInfo(res);
          });
      }
    }, []
  );

  React.useEffect(
    () => {
      setNameState({ ...nameState, value: routeInfo.name });
      setGradeState({ ...gradeState, value: routeInfo.grade });
      setAttemptState({ ...attemptState, value: routeInfo.attempts });
      setLocationState({ ...locationState, value: routeInfo.location });
      setLocationTypeState({ ...locationTypeState, value: routeInfo.locationType });
      setTimeState({ ...timeState, value: routeInfo.completed });
      setAngleState({ ...angleState, value: routeInfo.angle });
      setNoteState({ ...noteState, value: routeInfo.note });
    }, [routeInfo]
  );

  return (
    <div className='container w-50'>
      <form className='needs-validation' noValidate onSubmit={submitHandler}>
        <div className='container row row-cols-1 row-cols-md-2'>
          <div className={`form-group col mb-4 ${isEdit ? 'pointer' : ''}`}
            onClick={
              () => {
                if (isEdit) {
                  setNameState({ ...nameState, isEdit: true });
                }
              }
            }>
            {toggleTextInput(<h1>{nameState.value}</h1>,
              renderInput(nameState, setNameState, nameState.value, 'name'), nameState)}
          </div>
          <div className="col mb-4">
            <div className="btn-group pt-2" role='group'>
              {renderButton()}
            </div>
          </div>
        </div>
        <div className="container row row-cols-1 row-cols-md-2">
          <div className={`form-group col my-3 p-1 border-bottom border-secondary ${isEdit ? 'pointer' : ''}`}
            onClick={
              () => {
                if (isEdit) {
                  setGradeState({ ...gradeState, isEdit: true });
                }
              }
            }>
            {toggleTextInput(<span>{gradeConversion(gradeState.value)}</span>,
              renderInput(gradeState, setGradeState, 'V-Scale or Font Scale', 'grade'), gradeState)}
            <div className="invalid-feedback">
              <span>Invalid Grade. Please provide V-scale or Font scale grade.</span>
            </div>
          </div>
          <div className={`form-group col my-3 p-1 border-bottom border-secondary ${isEdit ? 'pointer' : ''}`}
            onClick={
              () => {
                if (isEdit) {
                  setAttemptState({ ...attemptState, isEdit: true });
                }
              }
            }>
            {toggleTextInput(<span>{attemptsConversion()}</span>,
              renderInput(attemptState, setAttemptState, '', 'attempt'), attemptState)}
            <div className="invalid-feedback">
              <span>Invalid attempts. Please provide only positive integer numbers.</span>
            </div>
          </div>
        </div>
        <div className="container row row-cols-1 row-cols-md-2">
          <div className={`form-group col my-3 p-1 border-bottom border-secondary ${isEdit ? 'pointer' : ''}`}
            onClick={
              () => {
                if (isEdit) {
                  setLocationState({ ...locationState, isEdit: true });
                }
              }
            }>
            {toggleTextInput(<span>{locationState.value}</span>,
              renderInput(locationState, setLocationState, '', 'location'), locationState)}
          </div>
          <div className={`form-group col my-3 p-1 border-bottom border-secondary ${isEdit ? 'pointer' : ''}`}
            onClick={
              () => {
                if (isEdit) {
                  setLocationTypeState({ ...locationTypeState, isEdit: true });
                }
              }
            }>
            {toggleTextInput(<span>{showInOutdoor()}</span>,
              renderInput(locationTypeState, setLocationTypeState, '', 'locationType'), locationTypeState)}
          </div>
        </div>
        <div className="container row row-cols-1 row-cols-md-2">
          <div className={`form-group col my-3 p-1 border-bottom border-secondary ${isEdit ? 'pointer' : ''}`}
            onClick={
              () => {
                if (isEdit) {
                  setTimeState({ ...timeState, isEdit: true });
                }
              }
            }>
            {toggleTextInput(<span>Sent at {formatDate()}</span>,
              renderInput(timeState, setTimeState, '', 'time'), timeState)}
          </div>
          <div className={`form-group col my-3 p-1 border-bottom border-secondary ${isEdit ? 'pointer' : ''}`}
            onClick={
              () => {
                if (isEdit) {
                  setAngleState({ ...angleState, isEdit: true });
                }
              }
            }>
            {toggleTextInput(<span>{angleState.value ? `Angle: ${angleState.value}°` : 'Angle: '}</span>,
              renderInput(angleState, setAngleState, '', 'angle'), angleState)}
            <div className="invalid-feedback">
              <span>Invalid angle. Please provide only positive integer numbers.</span>
            </div>
          </div>
        </div>
        <div className="container row">
          <div className="col p-1">
            <span className={`my-3 ${isEdit ? 'pointer' : ''}`} onClick={
              () => {
                if (isEdit) {
                  setNoteState({ ...noteState, isEdit: true });
                }
              }
            }>Notes:</span>
            {isEdit && noteState.isEdit ? <textarea className='form-control mt-2'
              value={noteState.tempValue} placeholder={noteState.value} id='note'
              onChange={
                e => setNoteState({ ...noteState, tempValue: e.target.value })
              } /> : <p className={`my-3 ${isEdit ? 'pointer' : ''}`}>{noteState.value || '--'}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default RouteDetail;
