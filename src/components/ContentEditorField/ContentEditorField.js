import React, { Component } from 'react';
import RichTextEditor from '~/components/RichTextEditor';

class ContentEditorField extends Component {
  render() {
    const { input } = this.props;
    return <RichTextEditor editorStateJson={ input.value } onChange={ input.onChange } />
  }
}

export default ContentEditorField;
