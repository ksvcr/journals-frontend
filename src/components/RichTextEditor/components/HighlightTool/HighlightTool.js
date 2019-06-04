import React, { Component } from 'react';

import ColorPicker from '~/components/RichTextEditor/components/ColorPicker/ColorPicker';
import Icon from '~/components/Icon/Icon';
import * as EditorCommands from '~/components/RichTextEditor/utils/EditorCommands';

import './highlight-tool.scss';
import './assets/letter.svg';

const { TEXT_HIGHLIGHT:command } = EditorCommands;

class HighlightTool extends Component {
  state = {
    showColorPicker: false
  };

  handleChange = ({ r, g, b, a }) => {
    const { editorState, editorView, dispatch } = this.props;
    const color = `rgba(${r},${g},${b},${a})`;
    command.execute(editorState, dispatch, editorView, color);
  };

  handlePickerShow = () => {
    this.setState({ showColorPicker: true });
  };

  handlePickerClose = () => {
    this.setState({ showColorPicker: false });
  };

  render() {
    const { showColorPicker } = this.state;
    const { editorState, editorView } = this.props;
    const disabled = !command.isEnabled(editorState, editorView);

    return (
      <div className="highlight-tool">
        <button className="highlight-tool__button" type="button"
                onClick={ this.handlePickerShow } disabled={ disabled }>
          <div className="highlight-tool__box" style={ { background: command.getColor(editorState) } }>
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
