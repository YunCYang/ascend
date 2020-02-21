import React from 'react';

const RouteDetail = props => {
  React.useEffect(
    () => props.setPath('/route/detail')
  );

  React.useEffect(
    () => {
      return null;
    }, []
  );

  return (
    <div className='container'>
      <div>
        <h1>{props.routeId}</h1>
      </div>
    </div>
  );
};

export default RouteDetail;
