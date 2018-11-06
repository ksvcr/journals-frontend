import React, { Component } from 'react';
import ContentEditor from '~/components/ContentEditor/ContentEditor';

class Editor extends Component {
  render() {
    return (
      <article className="page__content">
        <ContentEditor />
      </article>
    );
  }
}

export default Editor;
