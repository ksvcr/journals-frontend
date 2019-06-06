import React, { Component } from 'react';
import FontSizeCommand from '~/components/RichTextEditor/utils/commands/FontSizeCommand';
import findActiveFontSize from '~/components/RichTextEditor/utils/findActiveFontSize';

import './font-size-tool.scss';

class FontSizeTool extends Component {
  get fontSizes() {
    return [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ];
  }

  renderFontSizes = () => {
    return this.fontSizes.map((fontSize) => (
      <option key={ fontSize } value={ fontSize } onMouseDown={ (e) => e.preventDefault() }> { fontSize } </option>
    ));
  };

  handleChangeFontSize = (event) => {
    const { editorState, dispatch, editorView } = this.props;
    const { value:fontSize } = event.target;
    const command = new FontSizeCommand(fontSize);
    command.execute(editorState, dispatch, editorView, event)
  };

  render() {
    const { editorState, editorView } = this.props;
    const fontSize = findActiveFontSize(editorState);
    const command = new FontSizeCommand(fontSize);
    const isEnabled = command.isEnabled(editorState, editorView);
    return (
      <div className="font-size-tool">
        <select className="font-size-tool__select" name="font_size" value={ fontSize } disabled={ !isEnabled }
                onChange={ this.handleChangeFontSize }>
          { this.renderFontSizes() }
        </select>
      </div>
    );
  }
}

export default FontSizeTool;
