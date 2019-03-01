import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import Icon from '~/components/Icon/Icon';
import TextField from '~/components/TextField/TextField';

import formatBytes from '~/utils/formatBytes';
import getFileExtension from '~/utils/getFileExtension';

import './article-file-list.scss';
import './assets/remove.svg';

class ArticleFileList extends PureComponent {
  handleRemove = (event) => {
    const { index } = event.currentTarget.dataset;
    const { fields } = this.props;
    fields.remove(index);
  };

  renderItems = () => {
    const { fields } = this.props;
    return fields.map((field, index) => {
      const data = fields.get(index);
      return (
        <div key={ index } className="article-file-list__item">
          <div className="article-file-list__header">
            <div className="article-file-list__infobox">
              <div className="article-file-list__top">
                <span className="article-file-list__name">
                  { data.name }
                </span>
                <div className="article-file-list__actions">
                  <button type="button" className="article-file-list__remove"
                          data-index={ index } onClick={ this.handleRemove }>
                    <Icon className="article-file-list__remove-icon" name="remove" />
                  </button>
                </div>
              </div>
              <div className="article-file-list__info">
                { formatBytes(data.file_size) }, { getFileExtension(data.name) || 'неизвестно' }
              </div>
            </div>
          </div>
          { data.text_to_description !== undefined &&
            <div className="article-file-list__description form__field">
              <label htmlFor={ `${field}.text_to_description` } className="form__label">Описание файла</label>
              <Field name={ `${field}.text_to_description` } id={ `${field}.text_to_description` }
                     component={ TextField } placeholder="Введите описание" />
            </div>
          }
        </div>
      );
    })
  };

  render() {
    return (
      <div className="article-file-list">
        { this.renderItems() }
      </div>
    );
  }
}

export default ArticleFileList;
