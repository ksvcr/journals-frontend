import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';

import './color-picker.scss';

class ColorPicker extends Component {
  state = {
    color: {
      r: '255',
      g: '255',
      b: '255',
      a: '255',
    },
  };

  handleChange = color => {
    const { onChange } = this.props;
    onChange(color.rgb);
  };

  render() {
    return (
      <div className="color-picker">
        <div
          className="color-picker__cover"
          onClick={ this.props.onCloseRequest }
        />
        <div className="color-picker__box">
          <SketchPicker
            color={ this.props.color || this.state.color }
            onChange={ this.handleChange }
          />
        </div>
      </div>
    );
  }
}

ColorPicker.propTypes = {
  onCloseRequest: PropTypes.func,
  onChange: PropTypes.func
};

export default ColorPicker;
