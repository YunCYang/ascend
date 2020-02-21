import React from 'react';

const RouteCard = props => {
  const gradeConversion = () => {
    let fontScale = null;
    switch (props.route.grade) {
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

  const formatDate = () => {
    const timeArray = props.route.completed.split('');
    const dateArray = timeArray.slice(0, 10).join('').split('-');
    const usDateArray = [];
    usDateArray.push(dateArray[1]);
    usDateArray.push('/');
    usDateArray.push(dateArray[2]);
    usDateArray.push('/');
    usDateArray.push(dateArray[0]);
    return usDateArray.join('');
  };

  const paintBorder = () => {
    let borderClass = '';
    switch (props.route.grade) {
      case '0':
      case '1':
      case '2':
        borderClass = ' border-light';
        break;
      case '3':
      case '4':
      case '5':
        borderClass = ' border-warning';
        break;
      case '6':
      case '7':
      case '8':
        borderClass = ' border-success';
        break;
      case '9':
      case '10':
      case '11':
        borderClass = ' border-danger';
        break;
      case '12':
      case '13':
      case '14':
        borderClass = ' border-primary';
        break;
      case '15':
      case '16':
      case '17':
        borderClass = ' border-dark';
        break;
      default:
        borderClass = '';
    }
    return borderClass;
  };

  return (
    <div className='col mt-4'>
      <div className={`card ${paintBorder()}`}>
        <div className="card-body">
          <div className="name-grade container d-flex justify-content-between">
            <div>
              <h5 className='card-title'>{props.route.name}</h5>
            </div>
            <div>
              <h6>V{props.route.grade} | {gradeConversion()}</h6>
            </div>
          </div>
          <div className="card-text container d-flex justify-content-between">
            <div>
              <span>{props.route.location}</span>
            </div>
            <div>
              <i className="fas fa-times-circle fa-lg"></i>
            </div>
          </div>
          <footer className='container'><small>{formatDate()}</small></footer>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;
