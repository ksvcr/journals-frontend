import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, change, formValueSelector } from 'redux-form';
import { withNamespaces } from 'react-i18next';
import Dropzone from 'react-dropzone';

import Select from '~/components/Select/Select';
import ContentBlockList from '~/components/ContentBlockList/ContentBlockList';
import Checkbox from '~/components/Checkbox/Checkbox';
import FileDropPlaceholder from '~/components/FileDropPlaceholder/FileDropPlaceholder';
import DownloadLink from '~/components/DownloadLink/DownloadLink';

import fileToBase64 from '~/utils/fileToBase64';
import getArticleTypes from '~/services/getArticleTypes';

import './article-content-form.scss';
import * as validate from '~/utils/validate';

class ArticleContentForm extends Component {
  get typeOptions() {
    return getArticleTypes().map((item, index) => ({
      value: index,
      title: item
    }));
  }

  handleDropFiles = files => {
    const { change, formName } = this.props;
    const file = files[0];
    const filePromise = fileToBase64(file);

    return filePromise.then((base64) => {
      change(formName, 'incoming_file', base64 );
    });
  };

  renderContentBlockList = props => {
    const { formName } = this.props;
    return <ContentBlockList formName={ formName } { ...props } />;
  };

  render() {
    const { t, is_send_as_file, articleData } = this.props;
    const isProofreading = articleData.state_article === 'AWAIT_PROOFREADING';
    return (
      <div className="article-content-form">
        <h2 className="page__title">{ t('article_text') }</h2>
        { isProofreading ?
          <div className="article-content-form__file">
            <DownloadLink file={ articleData.incoming_file } name="Скачать контент статьи" />
          </div>
          :
          <div className="form__field">
            <Field name="is_send_as_file" id="is_send_as_file" type="checkbox"
                   component={ Checkbox } >
              Хочу добавить статью файлом
            </Field>
            <div className="article-content-form__description">
              При добавлении текста статьи файлом, стоимость размещения увеличится на 30%
            </div>
          </div>
        }

        { !isProofreading && is_send_as_file ? (
          <div className="form__field">
            <Dropzone className="article-content-form__dropzone"
                      accept=".doc, .docx, .rtf"
                      maxSize={ 50 * Math.pow(1024, 2) }
                      multiple={ false } onDrop={ this.handleDropFiles } >
              <FileDropPlaceholder />
            </Dropzone>
            <Field name="incoming_file" type="hidden" component="input"
                   validate={ [validate.required] } />
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
            <FieldArray name="content_blocks" component={ this.renderContentBlockList } />
          </Fragment>
        ) }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { formName, articleId } = props;
  const { articles } = state;
  const articleData = articles.data[articleId];
  const formSelector = formValueSelector(formName);
  const is_send_as_file = formSelector(state, 'is_send_as_file');

  return {
    articleData,
    is_send_as_file
  };
}

const mapDispatchToProps = {
  change
};

ArticleContentForm = withNamespaces()(ArticleContentForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleContentForm);
