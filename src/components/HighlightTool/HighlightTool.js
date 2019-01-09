import React, { Component } from 'react';

import ColorPicker from '~/components/ColorPicker/ColorPicker';
import Icon from '~/components/Icon/Icon';

import { styles } from '~/services/editorCustomStyler';

import './highlight-tool.scss';
import './assets/letter.svg';

class HighlightTool extends Component {
  state = {
    showColorPicker: false
  };

  get currentColor() {
    const { getEditorState } = this.props;
    return styles.background.current(getEditorState());
  }

  handleChange = ({ r, g, b, a }) => {
    const { getEditorState, setEditorState } = this.props;
    const color = `rgba(${r},${g},${b},${a})`;
    const newState = styles.background.add(getEditorState(), color);
    setEditorState(newState);
  };

  handlePickerShow = () => {
    this.setState({ showColorPicker: true });
  };

  handlePickerClose = () => {
    this.setState({ showColorPicker: false });
  };

  render() {
    const { showColorPicker } = this.state;
    return (
      <div className="highlight-tool">
        <button className="highlight-tool__button" type="button"
                onClick={ this.handlePickerShow }>
          <div className="highlight-tool__box" style={ { background: this.currentColor } }>
            <Icon name="letter" className="highlight-tool__icon" />
            Выбрать цвет фона
          </div>
        </button>

        { showColorPicker &&
          <ColorPicker color={ this.currentColor }
                       onChange={ this.handleChange }
                       onCloseRequest={ this.handlePickerClose }
          />
        }
      </div>
    );
  }
}

export default HighlightTool;
