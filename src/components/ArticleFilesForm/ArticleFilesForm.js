import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import nanoid from 'nanoid';
import { change, getFormValues, FieldArray } from 'redux-form';

import FileDropPlaceholder from '~/components/FileDropPlaceholder/FileDropPlaceholder';
import ArticleFileList from '~/components/ArticleFileList/ArticleFileList';

import fileToBase64 from '~/utils/fileToBase64';

import './article-files-form.scss';

class ArticleFilesForm extends Component {
  handleDropFiles = files => {
    const newFilesPromises = files.map(file => fileToBase64(file));
    Promise.all(newFilesPromises).then(result => {
      const newFiles = result.map((base64, index) => {
        const file = files[index];
        return {
          id: nanoid(),
          name: file.name,
          file_size: file.size,
          type: file.type,
          file: base64
        };
      });

      const { change, formValues, formName } = this.props;
      const attachments = [...formValues.attachments, ...newFiles];
      change(formName, 'attachments', attachments);
    });
  };

  render() {
    return (
      <div className="article-files-form">
        <h2 className="page__title">Файлы к статье</h2>
        <p className="article-files-form__description">
          Вы можете выбрать несколько файлов. Для каждого из них нужно будет
          заполнить описание
        </p>
        <Dropzone className="article-files-form__dropzone"
                  multiple={ true } onDrop={ this.handleDropFiles } >
          <FileDropPlaceholder />
        </Dropzone>

        <FieldArray name="attachments"
                    component={ props => <ArticleFileList { ...props } /> } />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { formName } = props;

  return {
    formValues: getFormValues(formName)(state)
  };
}

const mapDispatchToProps = {
  change
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleFilesForm);
