import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '~/components/Icon/Icon';
import TextField from '~/components/TextField/TextField';

import formatBytes from '~/utils/formatBytes';
import getFileExtension from '~/utils/getFileExtension';

import './article-files-form-item.scss';
import './assets/remove.svg';

class ArticleFilesFormItem extends Component {
  get fileSize() {
    const { file } = this.props;
    return formatBytes(file.file_size);
  }

  get fileExtension() {
    const { file } = this.props;
    return getFileExtension(file.name) || 'неизвестно';
  }

  handleRemoveClick = () => {
    const { file, onRemove } = this.props;
    onRemove(file.id);
  };

  handleDescriptionChange = (event) => {
    const { onChangeDescription, file } = this.props;
    const { value } = event.target;
    onChangeDescription(file.id, value);
  };

  render() {
    const { file } = this.props;
    return (
      <li className="article-files-form-item">
        <div className="article-files-form-item__header">
          <div className="article-files-form-item__infobox">
            <div className="article-files-form-item__top">
              <span className="article-files-form-item__name">
                { file.name }
              </span>
              <div className="article-files-form-item__actions">
                <button type="button" onClick={ this.handleRemoveClick } className="article-files-form-item__remove">
                  <Icon className="article-files-form-item__remove__icon" name="remove" />
                </button>
              </div>
            </div>
            <div className="article-files-form-item__info">
              { this.fileSize }, { this.fileExtension }
            </div>
          </div>
        </div>
        <div className="form__field">
          <label htmlFor="file_description" className="form__label">Описание файла</label>
          <TextField id="file_description" placeholder="Введите описание"
                      onChange={ this.handleDescriptionChange } value={ file.text_to_description } />
        </div>
      </li>
    );
  }
}

ArticleFilesFormItem.propTypes = {
  file: PropTypes.object.isRequired,
  onChangeDescription: PropTypes.func,
  onRemove: PropTypes.func
};

export default ArticleFilesFormItem;
