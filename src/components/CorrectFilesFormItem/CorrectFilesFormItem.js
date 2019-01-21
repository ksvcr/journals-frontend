import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '~/components/Button/Button';
import Icon from '~/components/Icon/Icon';
import TextField from '~/components/TextField/TextField';

import formatBytes from '~/utils/formatBytes';
import getFileExtension from '~/utils/getFileExtension';

import './correct-files-form-item.scss';
import './assets/download.svg';
import './assets/edit.svg';
import './assets/save.svg';

class CorrectFilesFormItem extends Component {
  state = {
    showForm: false
  };

  get fileSize() {
    const { file } = this.props;
    return formatBytes(file.file_size);
  }

  get fileExtension() {
    const { file } = this.props;
    return getFileExtension(file.name) || 'неизвестно';
  }

  handleDescriptionChange = (event) => {
    const { onChangeDescription, file } = this.props;
    const { value } = event.target;
    onChangeDescription(file.id, value);
  };

  handleDescriptionClick = () => this.setState({ showForm: true });

  handleSaveSubmit = (event) => {
    event.preventDefault();
    this.setState({ showForm: false });
  };

  renderDescription = () => {
    const { file } = this.props;
    return (
      <p onClick={ this.handleDescriptionClick } className="correct-files-form-item__description">
        <Icon className="correct-files-form-item__edit-icon" name="edit" />
        { file.text_to_description }
      </p>
    );
  };

  renderForm = () => {
    const { file } = this.props;
    return (
      <form onSubmit={ this.handleSaveSubmit }>
        <div className="form__field">
          <label htmlFor="file_description" className="form__label">Описание файла</label>
          <TextField id="file_description" placeholder="Введите описание"
                      onChange={ this.handleDescriptionChange } value={ file.text_to_description } />
        </div>
        <div className="form__field">
          <Button className="correct-files-form-item__save button_small" type="submit">
            <Icon className="correct-files-form-item__save-icon" name="save" />
            Сохранить
          </Button>
        </div>
      </form>
    );
  };

  render() {
    const { file } = this.props;
    const { showForm } = this.state;

    return (
      <li className="correct-files-form-item">
        <div className="correct-files-form-item__header">
          <div className="correct-files-form-item__infobox">
            <div className="correct-files-form-item__top">
              <a href={ file.file } target="blank" rel="noopener noreferrer" className="correct-files-form-item__link">
                <Icon className="correct-files-form-item__download-icon" name="download" />
                <span className="correct-files-form-item__name">
                  { file.name }
                </span>
              </a>
            </div>
            <div className="correct-files-form-item__info">
              { this.fileSize }, { this.fileExtension }
            </div>
          </div>
        </div>
        {
          showForm ? this.renderForm() : this.renderDescription()
        }
      </li>
    );
  }
}

CorrectFilesFormItem.propTypes = {
  file: PropTypes.object.isRequired,
  onChangeDescription: PropTypes.func
};

export default CorrectFilesFormItem;
