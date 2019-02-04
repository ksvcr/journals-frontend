import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '~/components/List/List';
import Icon from '~/components/Icon/Icon';

import './assets/cancel.svg';
import './field-set.scss';

class FieldSet extends Component {
  handleMoveUp = () => {
    const { index, onMove } = this.props;
    onMove({ from: index, to: index - 1 });
  };

  handleMoveDown = () => {
    const { index, onMove } = this.props;
    onMove({ from: index, to: index + 1 });
  };

  handleRemove = () => {
    const { index, onRemove } = this.props;
    onRemove(index);
  };

  render() {
    const { legend, fieldsTitle, index, isLast, children, onMove, onRemove } = this.props;
    return (
      <fieldset className="field-set">
        <div className="field-set__tools">
          { onMove && index > 0 &&
            <button className="field-set__tool field-set__tool_up" type="button" onClick={ this.handleMoveUp }>
              Сместить на уровень выше
            </button>
          }
          { onMove && !isLast &&
            <button className="field-set__tool field-set__tool_down" type="button" onClick={ this.handleMoveDown }>
              Сместить на уровень ниже
            </button>
          }
          { onRemove &&
            <button className="field-set__tool field-set__tool_remove" type="button" onClick={ this.handleRemove }>
              <Icon name="cancel" className="field-set__icon field-set__icon_remove" />
              Удалить
            </button>
          }
        </div>
        <legend className="field-set__legend-box">
          <div className="field-set__legend"> { legend } </div>
          { fieldsTitle &&
            <div className="field-set__title">{ fieldsTitle }</div>
          }
        </legend>
        <div className="field-set__holder">
          { children }
        </div>
      </fieldset>
    );
  }
}

List.propTypes = {
  index: PropTypes.number,
  isLast: PropTypes.bool,
  onMove: PropTypes.func,
  onRemove: PropTypes.func
};

export default FieldSet;
