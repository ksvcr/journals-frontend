import React, { Component } from 'react';
import { Field, change } from 'redux-form';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import classNames from 'classnames';

import ReqMark from '~/components/ReqMark/ReqMark';
import FieldHint from '~/components/FieldHint/FieldHint';
import FieldAddButton from '~/components/FieldAddButton/FieldAddButton';
import Icon from '~/components/Icon/Icon';
import ContentEditor from '~/components/ContentEditor/ContentEditor';

import * as validate from '~/utils/validate';

import './content-block.scss';
import './assets/cancel.svg';
import './assets/pen.svg';

class ContentBlock extends Component {
  getRef = ref => {
    if (ref) {
      this.input = ref.getEl();
    }
  };

  handleRemove = () => {
    const { index, onRemove } = this.props;
    onRemove(index);
  };

  handleTitleChange = event => {
    let { value } = event.target;
    const { formName, index, change } = this.props;
    const tmp = document.createElement('div');
    tmp.innerHTML = value;
    value = tmp.textContent;
    value = value ? value : 'Заголовок поля';
    change(formName, `content_blocks[${index}].title`, value);
  };

  handleTitleEditToogle = () => {
    const { index, isEditable, onEdit } = this.props;

    onEdit(isEditable ? null : index);

    if (this.input) {
      this.input.focus();
    }
  };

  render() {
    const { fields, data, index, field, isEditable, onAdd } = this.props;
    const editClasses = classNames('content-block__edit', {
      'content-block__edit_active': isEditable
    });
    return (
      <div className="content-block form__field">
        { data.static ? (
          <label htmlFor={ `block-${index}` } className="form__label">
            { data.title } <ReqMark />
            { data.hint && <FieldHint text={ data.hint } /> }
          </label>
        ) : (
          <div className="form__label content-block__label">
            <div className="content-block__label-tools">
              <ContentEditable
                className="content-block__title"
                disabled={ !isEditable }
                ref={ this.getRef }
                html={ data.title }
                onChange={ this.handleTitleChange }
              />{ ' ' }
              <ReqMark />
            </div>
            <button
              className={ editClasses }
              type="button"
              onClick={ this.handleTitleEditToogle }
            >
              <Icon className="content-block__edit-icon" name="pen" />
              Изменить
            </button>
            <button
              className="content-block__remove"
              type="button"
              onClick={ this.handleRemove }
            >
              <Icon className="content-block__remove-icon" name="cancel" />
              Удалить
            </button>
          </div>
        ) }
        <Field
          name={ `${field}.title` }
          type="hidden"
          component="input"
          validate={ [validate.required] }
        />
        <Field
          name={ `${field}.content` }
          id={ `block-${index}` }
          component={ ContentEditor }
          validate={ [validate.required] }
        />

        <div className="content-block__add">
          { index === fields.length - 2 && (
            <FieldAddButton onAdd={ onAdd }>Добавить поле</FieldAddButton>
          ) }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  change
};

export default connect(
  null,
  mapDispatchToProps
)(ContentBlock);
