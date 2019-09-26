import React from 'react';
import './inline-loader.scss';

const InlineLoader = () => {
  return (
    <div className="inline-loader">
      <span className="inline-loader__dot" />
      <span className="inline-loader__dot" />
      <span className="inline-loader__dot" />
    </div>
  );
};

export default InlineLoader;
