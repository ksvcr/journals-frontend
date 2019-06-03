import Color from 'color';
import React, { PureComponent } from 'react';
import classNames from 'classnames';

import PointerSurface from './PointerSurface'

import clamp from '../utils/clamp';

import './color-editor.scss';

function generateGreyColors(count){
  let cc = 255;
  const interval = cc / count;
  const colors = [];
  while (cc > 0) {
    const color = Color({ r: cc, g: cc, b: cc });
    cc -= interval;
    cc = Math.floor(cc);
    colors.unshift(color);
  }
  return colors;
}

function generateRainbowColors(
  count,
  saturation,
  lightness
) {
  const colors = [];
  const interval = 360 / count;
  const ss = clamp(0, saturation, 100);
  const ll = clamp(0, lightness, 100);
  let hue = 0;
  while (hue < 360) {
    const hsl = `hsl(${hue},${ss}%,${ll}%)`;
    const color = Color(hsl);
    colors.unshift(color);
    hue += interval;
  }
  return colors;
}

class ColorEditor extends PureComponent {
  render() {
    const renderColor = this._renderColor;
    return (
      <div className="color-editor">
        <div className="color-editor__section">
          { generateGreyColors(10).map(renderColor) }
        </div>
        <div className="color-editor__section">
          { generateRainbowColors(10, 90, 50).map(renderColor) }
        </div>
        <div className="color-editor__section">
          { generateRainbowColors(30, 70, 70).map(renderColor) }
        </div>
        <div className="color-editor__section">
          { generateRainbowColors(30, 90, 30).map(renderColor) }
        </div>
      </div>
    );
  }

  _renderColor = (color, index) => {
    const selectedColor = this.props.hex;
    const hex = color.hex().toLowerCase();
    const style = { backgroundColor: hex };
    const active = selectedColor && selectedColor.toLowerCase() === hex;
    const buttonClasses = classNames('color-editor__button', { 'color-editor__button_active' : active });
    return (
      <PointerSurface
        active={ active }
        key={ `${hex}-${index}` }
        onClick={ this._onSelectColor }
        value={ hex } >
        <span style={ style } className={ buttonClasses } />
      </PointerSurface>
    );
  };

  _onSelectColor = (hex) => {
    this.props.close(hex);
  };
}
export default ColorEditor;
