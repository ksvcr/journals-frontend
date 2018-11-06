import React from 'react';
import UIHint from '~/components/UIHint/UIHint';

import './field-hint.scss';

const FieldHint = ({ text, position }) => {
  return (
    <div className="field-hint">
      <UIHint text={ text } position={ position }>
        <button type="button" className="field-hint__button">?</button>
      </UIHint>
    </div>
  );
};

export default FieldHint;
