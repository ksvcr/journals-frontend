import React from 'react';
import './form-error.scss';

const FormError = ({ data }) => {
  return (
    <div className="form-error">
      { typeof data === 'string' ?
        <div className="form-error__item"> { data } </div> :
        Object.keys(data).map(key => {
          if (Array.isArray(data[key])) {
            return data[key].map(item => <div className="form-error__item" key={ key }> { item } </div>);
          } else {
            return <div className="form-error__item" key={ key }> { data[key] } </div>;
          }
        })
      }
    </div>
  );
};

export default FormError;
