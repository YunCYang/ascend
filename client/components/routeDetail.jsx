import React from 'react';
import { IdContext } from './app';

const RouteDetail = props => {
  const id = React.useContext(IdContext);
  const [routeInfo, setRouteInfo] = React.useState({});

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

  React.useEffect(
    () => props.setPath('/route/detail')
  );

  React.useEffect(
    () => {
      if (id.id) {
        fetch(`/api/route/detail/${id.id}/${props.routeId}`)
          .then(res => res.json())
          .then(res => setRouteInfo(res));
      }
    }, []
  );

  return (
    <div className='container w-75'>
      <div className='container row row-cols-1 row-cols-md-2'>
        <div className="col mb-4">
          <h1>{routeInfo.name}</h1>
        </div>
        <div className="col mb-4">
          <div className="btn-group pt-2" role='group'>
            <button type='button' className='btn btn-info'>Edit</button>
            <button type='button' className='btn btn-danger'>Delete</button>
          </div>
        </div>
      </div>
      <div className="container row row-cols-1 row-cols-md-2">
        <div className='col mb-3'>
          <p>V{routeInfo.grade} | {gradeConversion()}</p>
        </div>
        <div className='col mb-3'>
          <p>{attemptsConversion()}</p>
        </div>
      </div>
      <div className="container row row-cols-1 row-cols-md-2">
        <div className='col mb-3'>
          <p>{routeInfo.location}</p>
        </div>
        <div className='col mb-3'>
          <p>{showInOutdoor()}</p>
        </div>
      </div>
      <div className="container row row-cols-1 row-cols-md-2">
        <div className='col mb-3'>
          <p>Sent at {formatDate()}</p>
        </div>
        <div className='col mb-3'>
          <p>{routeInfo.angle ? `Angle: ${routeInfo.angle}°` : null}</p>
        </div>
      </div>
      <div className="container row">
        <div className="col">
          <p>Notes:</p>
          <p>{routeInfo.note}</p>
        </div>
      </div>
    </div>
  );
};

export default RouteDetail;
