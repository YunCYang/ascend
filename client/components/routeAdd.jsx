import React from 'react';

const RouteAdd = props => {
  React.useEffect(
    () => props.setPath('/route/add')
  );

  return (
    <div>
      <h1>Add Route</h1>
    </div>
  );
};

export default RouteAdd;
