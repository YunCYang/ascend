import React from 'react';

const RouteAdd = props => {
  React.useEffect(
    () => props.setPath('/route/add')
  );

  return (
    <div className="container py-2">
      <div className="container w-50">
        <form className="needs-validation" noValidate>
          <div className='container row row-cols-1 row-cols-md-2'>
            <div className='form-group col mb-4'>
              <input type="text" name="name" id="name" className='form-control mt-2'/>
              <div className="invalid-feedback">
                <span>Route name is required</span>
              </div>
            </div>
            <div className="col mb-4">
              <div className="btn-group pt-2" role='group'>
                <button type='button' className='btn btn-success'>Add</button>
                <button type='button' className='btn btn-secondary'>Cancel</button>
              </div>
            </div>
          </div>
          <div className="container row row-cols-1 row-cols-md-2">
            <div className='form-group col my-3 p-1 border-bottom border-secondary'>
              <input type="text" name="grade" id="grade" className='form-control mt-2'/>
              <div className="invalid-feedback"></div>
            </div>
            <div className='form-group col my-3 p-1 border-bottom border-secondary'>
              <input type="text" name="attempt" id="attempt" className='form-control mt-2' />
              <div className="invalid-feedback"></div>
            </div>
          </div>
          <div className="container row row-cols-1 row-cols-md-2">
            <div className='form-group col my-3 p-1 border-bottom border-secondary'>
              <input type="text" name="location" id="location" className='form-control mt-2' />
              <div className="invalid-feedback"></div>
            </div>
            <div className='form-group col my-3 p-1 border-bottom border-secondary'>
              <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="locationType"/>
                <label className="custom-control-label" htmlFor="locationType">
                  {props ? 'Outdoor' : 'Indoor'}
                </label>
                <div className="invalid-feedback"></div>
              </div>
            </div>
          </div>
          <div className="container row row-cols-1 row-cols-md-2">
            <div className='form-group col my-3 p-1 border-bottom border-secondary'>
              <input type="date" name="time" id="time" className='form-control mt-2' />
              <div className="invalid-feedback"></div>
            </div>
            <div className='form-group col my-3 p-1 border-bottom border-secondary'>
              <input type="text" name="angle" id="angle" className='form-control mt-2' />
              <div className="invalid-feedback"></div>
            </div>
          </div>
          <div className="container row">
            <div className="col p-1">
              <span>Notes:</span>
              <textarea name="note" id="note" className='form-control mt-2' />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RouteAdd;
