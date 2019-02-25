import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { change, Field, FieldArray, formValueSelector, getFormValues } from 'redux-form';
import { withNamespaces } from 'react-i18next';
import nanoid from 'nanoid';
import Dropzone from 'react-dropzone';
import Select from '~/components/Select/Select';
import ContentBlockList from '~/components/ContentBlockList/ContentBlockList';
import Checkbox from '~/components/Checkbox/Checkbox';
import FileDropPlaceholder from '~/components/FileDropPlaceholder/FileDropPlaceholder';
import ArticleFilesFormItem from '~/components/ArticleFilesFormItem/ArticleFilesFormItem';
import getArticleTypes from '~/services/getArticleTypes';
import fileToBase64 from '~/utils/fileToBase64';
import getFileExtension from '~/utils/getFileExtension';
import './article-content-form.scss';

const availableFormat = ['doc', 'docx', 'rtf'];
const maxAvailableSize = 50 * Math.pow(1024, 2);

class ArticleContentForm extends Component {
  state = {
    hasError: {
      status: false,
      text: ''
    }
  };

  get typeOptions() {
    return getArticleTypes().map((item, index) => ({
      value: index,
      title: item
    }));
  }

  handleDropFiles = files => {
    this.setState({ hasError: { status: false, text: '' } });

    const { change, formValues, formName } = this.props;
    const newFilesPromises = files.map(file => fileToBase64(file));

    Promise.all(newFilesPromises).then(result => {
      const newFiles = result
        .map((base64, index) => {
          const file = files[index];
          const ext = getFileExtension(file.name);

          if (availableFormat.indexOf(ext) < 0) {
            this.setState({
              hasError: {
                status: true,
                text: 'Один или несколько файлов имеют недопустимое расширение'
              }
            });
            return null;
          }

          if (file.size > maxAvailableSize) {
            this.setState({
              hasError: {
                status: true,
                text:
                  'Размер одного из файлов может быть больше максимально допустимого (50мб)'
              }
            });
            return null;
          }

          return {
            id: nanoid(),
            name: file.name,
            file_size: file.size,
            type: file.type,
            file: base64,
            text_to_description: ''
          };
        })
        .filter(file => file);

      const textFiles = [ ...formValues.text_files, ...newFiles ];
      change(formName, 'text_files', textFiles);
    });
  };

  handleChangeDescription = (fileId, description) => {
    const { change, formValues, formName } = this.props;
    const newTextFiles = formValues.text_files.map(file => {
      if (file.id === fileId) {
        file.text_to_description = description;
      }

      return file;
    });

    change(formName, 'text_files', newTextFiles);
  };

  handleRemoveFile = fileId => {
    const { formValues, formName, change } = this.props;
    const textFiles = formValues.text_files.filter(item => item.id !== fileId);

    change(formName, 'text_files', textFiles);
  };

  renderUploadItems = () => {
    const { formValues } = this.props;
    const { text_files } = formValues;

    return text_files.map((item, index) => {
      const showDivider = ++index < text_files.length;

      return (
        <Fragment key={ index }>
          <ArticleFilesFormItem file={ item } onChangeDescription={ this.handleChangeDescription }
                                onRemove={ this.handleRemoveFile }
          />
          { showDivider && <hr className="article-files-form__divider" /> }
        </Fragment>
      );
    });
  };

  renderContentBlockList = props => {
    const { formName } = this.props;
    return <ContentBlockList formName={ formName } { ...props } />;
  };

  render() {
    const { t, is_send_as_file } = this.props;
    const { hasError } = this.state;

    return (
      <div className="article-content-form">
        <h2 className="page__title">{ t('article_text') }</h2>
        <div className="form__field">
          <Field name="is_send_as_file" id="is_send_as_file" type="checkbox"
                 component={ Checkbox } >
            Хочу добавить статью файлом ({ availableFormat.join(', ') })
          </Field>
          <div className="article-content-form__description">
            При добавлении текста статьи файлом, стоимость размещения увеличится
            на 30%
          </div>
        </div>
        { is_send_as_file ? (
          <div className="form__field">
            { hasError.status && (
              <div className="article-content-form__error">
                { hasError.text }
              </div>
            ) }
            <Dropzone className="article-content-form__dropzone"
                      multiple={ true } onDrop={ this.handleDropFiles } >
              <FileDropPlaceholder />
            </Dropzone>
            <ul className="article-files-form__list">
              { this.renderUploadItems() }
            </ul>
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
    formValues: getFormValues(formName)(state),
    is_send_as_file
  };
}

ArticleContentForm = withNamespaces()(ArticleContentForm);

export default connect(
  mapStateToProps,
  {
    change
  }
)(ArticleContentForm);
