import React, { Component } from 'react';
import ContentEditor from '~/components/ContentEditor/ContentEditor';

class ContentEditorField extends Component {
  render() {
    const { input } = this.props;
    return <ContentEditor value={ input.value } onChange={ input.onChange } />
  }
}

export default ContentEditorField;
