import React, { PureComponent } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import FieldSet from '~/components/FieldSet/FieldSet';
import FieldAddButton from '~/components/FieldAddButton/FieldAddButton';

import './field-set-list.scss';

class FieldSetList extends PureComponent {
  handleAdd = () => {
    const { fields, initialValues } = this.props;
    fields.push(initialValues);
  };

  handleMove = ({ from, to }) => {
    const { fields } = this.props;
    fields.move(from, to);
  };

  handleRemove = index => {
    const { fields } = this.props;
    fields.remove(index);
  };

  render() {
    const { fields, legend, addText, children } = this.props;
    return (
      <div className="field-set-list">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={ 400 }
          transitionLeaveTimeout={ 200 }
        >
          { fields.map((field, index) => (
            <FieldSet key={ index } isLast={ index === fields.length - 1 } index={ index }
                      legend={ `${legend} №${index + 1}` }
                      onRemove={ this.handleRemove } onMove={ this.handleMove } >
              { children(field, index, fields.get(index)) }
            </FieldSet>
          )) }
        </ReactCSSTransitionGroup>

        <div className="field-set-list__button">
          <FieldAddButton onAdd={ this.handleAdd }> { addText } </FieldAddButton>
        </div>
      </div>
    );
  }
}

FieldSetList.defaultProps = {
  initialValues: {}
};

export default FieldSetList;
