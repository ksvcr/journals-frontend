import React, {Component} from 'react';
import { RichUtils } from 'draft-js';

class HeadlinesSelect extends Component {
  handleClick = (event) => {
    event.stopPropagation();
  };

  handleChange = (event) => {
    const { target } = event;
    const { setEditorState, getEditorState } = this.props;
    const blockType = target.value;
    setEditorState(RichUtils.toggleBlockType(getEditorState(), blockType));
  };

  get headlinesData() {
    return [
      {
        value: 'header-one',
        label: 'H1'
      },
      {
        value: 'header-two',
        label: 'H2'
      },
      {
        value: 'header-three',
        label: 'H3'
      },
      {
        value: 'header-four',
        label: 'H4'
      },
      {
        value: 'header-five',
        label: 'H5'
      },
      {
        value: 'header-six',
        label: 'H5'
      }
    ];
  }

  renderOptions = () => {
    return this.headlinesData.map(item => (
      <option key={ item.value } value={ item.value }>{ item.label }</option>
    ));
  };

  render() {
    return (
      <div onClick={ this.handleClick }>
        <select name="headlines-select" id="headlines-select" onChange={ this.handleChange }>
          { this.renderOptions() }
        </select>
      </div>
    );
  }
}

export default HeadlinesSelect;
