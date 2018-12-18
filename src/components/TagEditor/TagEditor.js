import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';
import nanoid from 'nanoid';
import classNames from 'classnames';

import './tag-editor.scss';

class TagEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: this.props.data.length < 1,
      newText: ''
    };
  }

  getRef = (ref) => {
    if (ref) {
      this.input = ref.getEl();
    }
  };

  handleAdd = () => {
    this.setState({
      isEdit: true
    }, () => {
      setTimeout(() => {
        if (this.input) {
          this.input.focus();
        }
      }, 0);
    });
  };

  handleBlur = () => {
    const { id, onChange } = this.props;
    const { newText } = this.state;
    let newState = {
      isEdit: false,
      newText: ''
    };

    if (newText) {
      onChange(id, newText);
    }

    this.setState(newState);
  };

  handleChange = (event) => {
    let { value } = event.target;
    const tmp = document.createElement('div');
    tmp.innerHTML = value;
    value = tmp.textContent;
    value = value ? value : '';
    this.setState({
      newText: value
    });
  };

  renderTags = () => {
    const { data } = this.props;
    return data.map(item => (
      <div className="tag-editor__item" key={ item.id || item.key }>
        <div className="tag-editor__box">
          { item.text }
        </div>
      </div>
    ));
  };

  render() {
    const { isEdit, newText } = this.state;
    const itemClasses = classNames('tag-editor__item', { 'tag-editor__item_empty': !newText });
    return (
      <div className="tag-editor">
        <div className="tag-editor__list">
          { this.renderTags() }
          <div className={ itemClasses }>
            { isEdit ?
              <ContentEditable className="tag-editor__box tag-editor__box_field" ref={ this.getRef } html={ newText }
                               onChange={ this.handleChange } onBlur={ this.handleBlur } /> :
              <button className="tag-editor__add" type="button"
                      onClick={ this.handleAdd }>Добавить тег</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

TagEditor.defaultProps = {
  data: []
};

TagEditor.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func
};

export default TagEditor;
