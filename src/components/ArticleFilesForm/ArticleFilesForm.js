import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { FieldArray, arrayPush } from 'redux-form';
import { withNamespaces } from 'react-i18next';

import FileDropPlaceholder from '~/components/FileDropPlaceholder/FileDropPlaceholder';
import ArticleFileList from '~/components/ArticleFileList/ArticleFileList';
import { getUserData } from '~/store/user/selector';

import fileToBase64 from '~/utils/fileToBase64';

import './article-files-form.scss';

class ArticleFilesForm extends Component {
  handleDropFiles = files => {
    const { arrayPush, formName } = this.props;
    const newFilesPromises = files.map(file => fileToBase64(file));
    Promise.all(newFilesPromises).then(result => {
      const newFiles = result.map((base64, index) => {
        const file = files[index];
        return {
          name: file.name,
          file_size: file.size,
          type: file.type,
          file: base64,
          text_to_description: ''
        };
      });
      newFiles.forEach(file => {
        arrayPush(formName, 'file_atachments', file);
      })
    });
  };

  renderFileList = props => <ArticleFileList { ...props } />;

  render() {
    const { t, isProofreading } = this.props;
    return (
      <div className="article-files-form">
        <h2 className="page__title">{ t('files_to_article') }</h2>

        { isProofreading ?
          <FieldArray name="file_atachments"
                      component={ props => <ArticleFileList download { ...props } /> } /> :
          <React.Fragment>
            <p className="article-files-form__description">{ t('select_several_files') }</p>
            <Dropzone className="article-files-form__dropzone"
                      accept=".doc, .docx, .rtf"
                      maxSize={ 50 * Math.pow(1024, 2) }
                      multiple={ true } onDrop={ this.handleDropFiles } >
              <FileDropPlaceholder />
            </Dropzone>

            <FieldArray name="file_atachments"
                        component={ this.renderFileList } />
          </React.Fragment>
        }

      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { articleId } = props;
  const { articles } = state;
  const articleData = articles.data[articleId];
  const userData = getUserData(state);

  return {
    userData,
    isProofreading: userData.role === 'CORRECTOR' && articleData.state_article === 'AWAIT_PROOFREADING'
  };
}

const mapDispatchToProps = {
  arrayPush
};

ArticleFilesForm = withNamespaces()(ArticleFilesForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleFilesForm);
