import React from 'react';
import { IdContext } from './app';

const RouteDetail = props => {
  const id = React.useContext(IdContext);
  const [routeInfo, setRouteInfo] = React.useState({});
  const [isEdit, setIsEdit] = React.useState(false);
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
    tempValue: '',
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

  const gradeConversion = () => {
    let fontScale = null;
    switch (routeInfo.grade) {
      case '0':
        fontScale = '4';
        break;
      case '1':
        fontScale = '5';
        break;
      case '2':
        fontScale = '5+';
        break;
      case '3':
        fontScale = '6A/6A+';
        break;
      case '4':
        fontScale = '6B/6B+';
        break;
      case '5':
        fontScale = '6C/6C+';
        break;
      case '6':
        fontScale = '7A';
        break;
      case '7':
        fontScale = '7A+';
        break;
      case '8':
        fontScale = '7B/7B+';
        break;
      case '9':
        fontScale = '7B+/7C';
        break;
      case '10':
        fontScale = '7C+';
        break;
      case '11':
        fontScale = '8A';
        break;
      case '12':
        fontScale = '8A+';
        break;
      case '13':
        fontScale = '8B';
        break;
      case '14':
        fontScale = '8B+';
        break;
      case '15':
        fontScale = '8C';
        break;
      case '16':
        fontScale = '8C+';
        break;
      case '17':
        fontScale = '9A';
        break;
      default:
        fontScale = null;
    }
    return fontScale;
  };

  const attemptsConversion = () => {
    if (routeInfo.attempts === 1) return 'Flash';
    else return `${routeInfo.attempts} tries`;
  };

  const showInOutdoor = () => {
    if (routeInfo.locationType) return 'Outdoor';
    else return 'Indoor';
  };

  const formatDate = () => {
    if (routeInfo.completed) {
      const timeArray = routeInfo.completed.split('');
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
            () => {
              updateValue();
              // resetEdit();
            }
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

  const renderInput = (state, setState, placeholder) => {
    return (
      <>
        <input type={setState === setTimeState ? 'date' : 'text'}
          className='form-control mt-2' value={state.tempValue}
          placeholder={placeholder} onChange={
            e => setState({ ...state, tempValue: e.target.value })
          } />
      </>
    );
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
      <div className='container row row-cols-1 row-cols-md-2'>
        <div className={`col mb-4 ${isEdit ? 'pointer' : ''}`}
          onClick={
            () => {
              if (isEdit) {
                setNameState({
                  ...nameState,
                  isEdit: true
                });
              }
            }
          }>
          {toggleTextInput(<h1>{nameState.value}</h1>,
            renderInput(nameState, setNameState, nameState.value), nameState)}
        </div>
        <div className="col mb-4">
          <div className="btn-group pt-2" role='group'>
            {renderButton()}
          </div>
        </div>
      </div>
      <div className="container row row-cols-1 row-cols-md-2">
        <div className={`col my-3 p-1 border-bottom border-secondary ${isEdit ? 'pointer' : ''}`}
          onClick={
            () => {
              if (isEdit) {
                setGradeState({
                  ...gradeState,
                  isEdit: true
                });
              }
            }
          }>
          {toggleTextInput(<span>V{routeInfo.grade} | {gradeConversion()}</span>,
            renderInput(gradeState, setGradeState, 'V-Scale Only'), gradeState)}
        </div>
        <div className={`col my-3 p-1 border-bottom border-secondary ${isEdit ? 'pointer' : ''}`}
          onClick={
            () => {
              if (isEdit) {
                setAttemptState({
                  ...attemptState,
                  isEdit: true
                });
              }
            }
          }>
          {toggleTextInput(<span>{attemptsConversion()}</span>,
            renderInput(attemptState, setAttemptState), attemptState)}
        </div>
      </div>
      <div className="container row row-cols-1 row-cols-md-2">
        <div className={`col my-3 p-1 border-bottom border-secondary ${isEdit ? 'pointer' : ''}`}
          onClick={
            () => {
              if (isEdit) {
                setLocationState({
                  ...locationState,
                  isEdit: true
                });
              }
            }
          }>
          {toggleTextInput(<span>{locationState.value}</span>,
            renderInput(locationState, setLocationState), locationState)}
        </div>
        <div className={`col my-3 p-1 border-bottom border-secondary ${isEdit ? 'pointer' : ''}`}
          onClick={
            () => {
              if (isEdit) {
                setLocationTypeState({
                  ...locationTypeState,
                  isEdit: true
                });
              }
            }
          }>
          {toggleTextInput(<span>{showInOutdoor()}</span>,
            renderInput(locationTypeState, setLocationTypeState), locationTypeState)}
        </div>
      </div>
      <div className="container row row-cols-1 row-cols-md-2">
        <div className={`col my-3 p-1 border-bottom border-secondary ${isEdit ? 'pointer' : ''}`}
          onClick={
            () => {
              if (isEdit) {
                setTimeState({
                  ...timeState,
                  isEdit: true
                });
              }
            }
          }>
          {toggleTextInput(<span>Sent at {formatDate()}</span>,
            renderInput(timeState, setTimeState), timeState)}
        </div>
        <div className={`col my-3 p-1 border-bottom border-secondary ${isEdit ? 'pointer' : ''}`}
          onClick={
            () => {
              if (isEdit) {
                setAngleState({
                  ...angleState,
                  isEdit: true
                });
              }
            }
          }>
          {toggleTextInput(<span>{angleState.value ? `Angle: ${angleState.value}°` : null}</span>,
            renderInput(angleState, setAngleState), angleState)}
        </div>
      </div>
      <div className="container row">
        <div className="col p-1">
          <span className={`my-3 ${isEdit ? 'pointer' : ''}`} onClick={
            () => {
              if (isEdit) {
                setNoteState({
                  ...noteState,
                  isEdit: true
                });
              }
            }
          }>Notes:</span>
          {toggleTextInput(<p className={`my-3 ${isEdit ? 'pointer' : ''}`}>{routeInfo.note || '--'}</p>,
            renderInput(noteState, setNoteState), noteState)}
        </div>
      </div>
    </div>
  );
};

export default RouteDetail;
