import React from 'react';
import { IdContext } from './app';
import { gradeConversion } from './routeDetail';

const Stat = () => {
  const id = React.useContext(IdContext);
  const [bestGrade, setBestGrade] = React.useState(null);
  const [favLocation, setFavLocation] = React.useState(null);

  React.useEffect(
    () => {
      fetch(`/api/stat/best/${id.id}`)
        .then(res => res.json())
        .then(res => setBestGrade(res.grade));
    }, []
  );

  React.useEffect(
    () => {
      fetch(`/api/stat/favLoc/${id.id}`)
        .then(res => res.json())
        .then(res => setFavLocation(res.location));
    }, []
  );

  return (
    <div className="section container py-2">
      <div className='container'>
        <ul className="list-group">
          <li className="list-group-item">
            <span>Best Grade: </span>
            <span>{gradeConversion('v' + bestGrade)}</span>
          </li>
          <li className="list-group-item">
            <span>Favorite Location: </span>
            <span>{favLocation}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Stat;
