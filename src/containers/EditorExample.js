import React, { Component } from 'react';
import ContentEditor from '~/components/ContentEditor/ContentEditor';

class EditorExample extends Component {
  handleChange = (data) => {
    console.log(data);
  };
  
  render() {
    return (
      <div>
        <ContentEditor onChange={ this.handleChange }/>
      </div>
    );
  }
}

export default EditorExample;
