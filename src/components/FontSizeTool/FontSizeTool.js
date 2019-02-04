import React, { Component } from 'react';

import { styles } from '~/services/editorCustomStyler';
import './font-size-tool.scss';

const DEFAULT_FONT_SIZE = 14;

class FontSizeTool extends Component {
  get fontSizes() {
    return [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ];
  }

  renderFontSizes = () => {
    return this.fontSizes.map((fontSize) => (
      <option key={ fontSize } value={ fontSize }> { fontSize } </option>
    ));
  };

  handleChangeFontSize = ({ target }) => {
    const { getEditorState, setEditorState } = this.props;
    const { value:fontSize } = target;
    const newState = styles.fontSize.add(getEditorState(), `${ fontSize }px`);
    setEditorState(newState);
  };

  render() {
    return (
      <div className="font-size-tool">
        <select className="font-size-tool__select" name="font_size"
                defaultValue={ DEFAULT_FONT_SIZE } onChange={ this.handleChangeFontSize }>
          { this.renderFontSizes() }
        </select>
      </div>
    );
  }
}

export default FontSizeTool;
