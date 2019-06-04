import React, { Component } from 'react';

import ColorPicker from '~/components/RichTextEditor/components/ColorPicker/ColorPicker';
import Icon from '~/components/Icon/Icon';
import { withNamespaces } from 'react-i18next';
import * as EditorCommands from '~/components/RichTextEditor/utils/EditorCommands';

import './color-tool.scss';
import './assets/letter.svg';

const { TEXT_COLOR:command } = EditorCommands;

class ColorTool extends Component {
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
    const { editorState, editorView, t } = this.props;
    const { showColorPicker } = this.state;
    const disabled = !command.isEnabled(editorState, editorView);
    return (
      <div className="color-tool">
        <button
          className="color-tool__button"
          type="button"
          disabled={ disabled }
          onClick={ this.handlePickerShow }
        >
          <Icon name="letter" className="color-tool__icon" />
          { t('select_text_color') }
          <div
            className="color-tool__box"
            style={ { background: this.currentColor } }
          />
        </button>

        { showColorPicker && (
          <ColorPicker
            color={ this.currentColor }
            onChange={ this.handleChange }
            onCloseRequest={ this.handlePickerClose }
          />
        ) }
      </div>
    );
  }
}
ColorTool = withNamespaces()(ColorTool);


export default ColorTool;
