import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {change, FieldArray, formValueSelector, getFormValues} from 'redux-form';
import nanoid from 'nanoid';
import Dropzone from 'react-dropzone';

import Checkbox from '~/components/Checkbox/Checkbox';
import FileDropPlaceholder from '~/components/FileDropPlaceholder/FileDropPlaceholder';
import ArticleFilesFormItem from '~/components/ArticleFilesFormItem/ArticleFilesFormItem';
import ArticleSourceList from '~/components/ArticleSourceList/ArticleSourceList';

import fileToBase64 from '~/utils/fileToBase64';
import getFileExtension from '~/utils/getFileExtension';

const availableFormat = ['doc', 'docx', 'rtf'];
const maxAvailableSize = 50 * Math.pow(1024, 2);

class ArticleSourcesForm extends Component {
  state = {
    isFile: false,
    hasError: {
      status: false,
      text: '',
    }
  };

  renderSourceList = (props) => {
    const { formName, isCorrector } = this.props;

    const initialValues = {
      isEdit: true,
      hash: nanoid()
    };

    return (
      <ArticleSourceList formName={ formName } legend="Источник" addText="Добавить источник"
                         initialValues={ initialValues } isCorrector={ isCorrector } { ...props } />
    );
  };

  handleChange = () => {
    this.setState({ isFile: !this.state.isFile });
  };

  handleDropFiles = (files) => {
    this.setState({ hasError: { status: false, text: '' }});

    const { change, formName } = this.props;
    const file = files[0];
    const filePromise = fileToBase64(file);

    return filePromise.then((result) => {
      const ext = getFileExtension(file.name);

      if(availableFormat.indexOf(ext) < 0) {
        this.setState({ hasError: {
            status: true,
            text: 'Один или несколько файлов имеют недопустимое расширение',
          }});
        return null;
      }

      if(file.size > maxAvailableSize) {
        this.setState({ hasError: {
            status: true,
            text: 'Размер одного из файлов может быть больше максимально допустимого (50мб)',
          }});
        return null;
      }

      change(formName, 'list_literature_file', result);
    });
  };

  renderUploadItems = () => {
    const { formValues } = this.props;
    const { list_literature_file } = formValues;

    return (
      <Fragment key={ 0 }>
        <ArticleFilesFormItem
          file={ list_literature_file }/>
          <hr className="article-files-form__divider" />
      </Fragment>
    );
  };

  render() {
    const { isFile, hasError } = this.state;

    return (
      <div className="article-sources">
        <h2 className="page__title">Список литературы</h2>

        <div className="form__field">
          <Checkbox value={ isFile } checked={ isFile }
                    onChange={ this.handleChange }>
            Хочу добавить список литературы файлом
          </Checkbox>
          <div className="article-content-form__description">
            При добавлении списка литературы файлом, стоимость размещения увеличится на 30%
          </div>
        </div>

        { isFile
          ?
          <div className="form__field">
            { hasError.status && <div className="article-content-form__error">{ hasError.text }</div> }
            <Dropzone
              className="article-content-form__dropzone"
              multiple={ false }
              onDrop={ this.handleDropFiles }>
              <FileDropPlaceholder />
            </Dropzone>
            <ul className="article-files-form__list">
              { this.renderUploadItems() }
            </ul>
          </div>
          :
          <div className="form__field">
            <FieldArray name="sources" rerenderOnEveryChange={ true }
                        component={ this.renderSourceList } />
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { user } = state;
  const { formName } = props;
  const formSelector = formValueSelector(formName);
  const list_literature_file = formSelector(state, 'list_literature_file');

  return {
    formValues: getFormValues(formName)(state),
    list_literature_file,
    isCorrector: user.data.role === 'CORRECTOR'
  };
}

const mapDispatchToProps = {
  change
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleSourcesForm);
