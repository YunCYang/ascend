import React from 'react';
import { withRouter } from 'react-router-dom';
import { IdContext } from './app';
import RouteCard from './routeCard';

const RouteLog = props => {
  const [routeList, setRouteList] = React.useState([]);
  const id = React.useContext(IdContext);

  React.useEffect(
    () => props.setPath('/route')
  );

  React.useEffect(
    () => {
      if (id.id) {
        fetch(`/api/route/all/${id.id}`)
          .then(res => res.json())
          .then(res => setRouteList(res));
      }
    }, [routeList.length]
  );

  const createRouteCard = () => {
    if (routeList.length) {
      return routeList.map((item, index) => <RouteCard key={`route${index}`} route={item} />);
    } else return null;
  };

  return (
    <div className='container py-2'>
      <div className='row row-cols-1 row-cols-md-2'>
        {createRouteCard()}
      </div>
    </div>
  );
};

export default withRouter(RouteLog);
