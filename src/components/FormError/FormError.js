import React from 'react';
import './form-error.scss';

const FormError = ({ data }) => {
  function renderErrorItems(data) {
    return typeof data === 'string' ?
      <div className="form-error__item"> { data } </div> :
      Object.keys(data).map(key => {
        if (Array.isArray(data[key])) {
          return data[key].map(item => <div className="form-error__item" key={ key }> { item } </div>);
        } else if (typeof data[key] === 'object') {
          return renderErrorItems(data[key]);
        } else {
          return <div className="form-error__item" key={ key }> { data[key] } </div>;
        }
      })
  }

  return (
    <div className="form-error">
      { renderErrorItems(data) }
    </div>
  );
};

export default FormError;
