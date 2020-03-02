import React from 'react';

const Stat = () => {
  return (
    <div className="section container py-2">
      <div className='container'>
        <ul className="list-group">
          <li className="list-group-item">
            <span>Best Grade: </span>
          </li>
          <li className="list-group-item">
            <span>Favorite Location: </span>
          </li>
          <li className="list-group-item">
            <span>Average Attempts: </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Stat;
