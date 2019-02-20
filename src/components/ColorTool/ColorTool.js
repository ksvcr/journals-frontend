import React, { Component } from "react";

import ColorPicker from "~/components/ColorPicker/ColorPicker";
import Icon from "~/components/Icon/Icon";

import { styles } from "~/services/editorCustomStyler";

import "./color-tool.scss";
import "./assets/letter.svg";

class ColorTool extends Component {
  state = {
    showColorPicker: false
  };

  get currentColor() {
    const { getEditorState } = this.props;
    return styles.color.current(getEditorState());
  }

  handleChange = ({ r, g, b, a }) => {
    const { getEditorState, setEditorState } = this.props;
    const color = `rgba(${r},${g},${b},${a})`;
    const newState = styles.color.add(getEditorState(), color);
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
      <div className="color-tool">
        <button
          className="color-tool__button"
          type="button"
          onClick={this.handlePickerShow}
        >
          <Icon name="letter" className="color-tool__icon" />
          Выбрать цвет текста
          <div
            className="color-tool__box"
            style={{ background: this.currentColor }}
          />
        </button>

        {showColorPicker && (
          <ColorPicker
            color={this.currentColor}
            onChange={this.handleChange}
            onCloseRequest={this.handlePickerClose}
          />
        )}
      </div>
    );
  }
}

export default ColorTool;
