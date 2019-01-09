import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';
import classNames from 'classnames';

import Icon from '~/components/Icon/Icon';

import './assets/cancel.svg';
import './tag-editor.scss';

class TagEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
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

  handleRemove = (event) => {
    const { entityId, onRemove } = this.props;
    let { id } = event.currentTarget.dataset;
    id = parseInt(id, 10);
    onRemove(entityId, id);
  };

  handleCreate = () => {
    const { entityId, onAdd } = this.props;
    const { newText } = this.state;
    const newState = {
      isEdit: false,
      newText: ''
    };

    if (newText) {
      onAdd(entityId, newText);
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

  handleKeyPressed = (event) => {
    if (event.keyCode === 13) {
      this.handleCreate();
    }
  };

  renderTags = () => {
    const { data } = this.props;
    return data.map(item => (
      <div className="tag-editor__item" key={ item.id }>
        <div className="tag-editor__box">
          { item.text }
          <button type="button" className="tag-editor__remove"
                  data-id={ item.id } onClick={ this.handleRemove }>
            <Icon name="cancel" className="tag-editor__remove-icon" />
            Удалить тег
          </button>
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
                               onChange={ this.handleChange } onBlur={ this.handleCreate } onKeyDown={ this.handleKeyPressed } /> :
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
  entityId: PropTypes.number,
  data: PropTypes.array,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func
};

export default TagEditor;
