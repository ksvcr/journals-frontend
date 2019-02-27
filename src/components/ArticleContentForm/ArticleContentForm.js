import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { arrayPush, Field, FieldArray, formValueSelector } from 'redux-form';
import { withNamespaces } from 'react-i18next';
import Dropzone from 'react-dropzone';

import Select from '~/components/Select/Select';
import ContentBlockList from '~/components/ContentBlockList/ContentBlockList';
import Checkbox from '~/components/Checkbox/Checkbox';
import FileDropPlaceholder from '~/components/FileDropPlaceholder/FileDropPlaceholder';
import ArticleFileList from '~/components/ArticleFileList/ArticleFileList';

import fileToBase64 from '~/utils/fileToBase64';
import getArticleTypes from '~/services/getArticleTypes';

import './article-content-form.scss';

class ArticleContentForm extends Component {
  get typeOptions() {
    return getArticleTypes().map((item, index) => ({
      value: index,
      title: item
    }));
  }

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
          file: base64
        };
      });

      newFiles.forEach(file => {
        arrayPush(formName, 'text_files', file);
      })
    });
  };

  renderContentBlockList = props => {
    const { formName } = this.props;
    return <ContentBlockList formName={ formName } { ...props } />;
  };

  render() {
    const { t, is_send_as_file } = this.props;

    return (
      <div className="article-content-form">
        <h2 className="page__title">{ t('article_text') }</h2>
        <div className="form__field">
          <Field name="is_send_as_file" id="is_send_as_file" type="checkbox"
                 component={ Checkbox } >
            Хочу добавить статью файлом
          </Field>
          <div className="article-content-form__description">
            При добавлении текста статьи файлом, стоимость размещения увеличится на 30%
          </div>
        </div>

        { is_send_as_file ? (
          <div className="form__field">
            <Dropzone className="article-content-form__dropzone"
                      accept=".doc, .docx, .rtf"
                      maxSize={ 50 * Math.pow(1024, 2) }
                      multiple={ true } onDrop={ this.handleDropFiles } >
              <FileDropPlaceholder />
            </Dropzone>
            <FieldArray name="text_files"
                        component={ props => <ArticleFileList { ...props } /> } />
          </div>
        ) : (
          <Fragment>
            <div className="form__field">
              <label htmlFor="article_type" className="form__label">
                Тип статьи
              </label>
              <Field name="article_type" id="article_type"
                     options={ this.typeOptions } component={ Select } />
            </div>
            <FieldArray name="content_blocks" component={ this.renderContentBlockList }
            />
          </Fragment>
        ) }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { formName } = props;
  const formSelector = formValueSelector(formName);
  const is_send_as_file = formSelector(state, 'is_send_as_file');

  return {
    is_send_as_file
  };
}

const mapDispatchToProps = {
  arrayPush
};

ArticleContentForm = withNamespaces()(ArticleContentForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleContentForm);
