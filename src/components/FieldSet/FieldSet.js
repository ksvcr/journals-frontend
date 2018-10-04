import React, {Component} from 'react';
import './field-set.scss';

class FieldSet extends Component {
  render() {
    const { legend, children } = this.props;
    return (
      <fieldset className="field-set">
        <legend className="field-set__legend"> { legend } </legend>
        <div className="field-set__holder">
          { children }
        </div>
      </fieldset>
    );
  }
}

export default FieldSet;
