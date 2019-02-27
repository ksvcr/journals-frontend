import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, FieldArray, formValueSelector, getFormValues } from 'redux-form';
import nanoid from 'nanoid';
import Dropzone from 'react-dropzone';

import Checkbox from '~/components/Checkbox/Checkbox';
import FileDropPlaceholder from '~/components/FileDropPlaceholder/FileDropPlaceholder';
import ArticleSourceList from '~/components/ArticleSourceList/ArticleSourceList';

import fileToBase64 from '~/utils/fileToBase64';
import ArticleFileList from '~/components/ArticleFileList/ArticleFileList';


class ArticleSourcesForm extends Component {
  state = {
    isFile: false,
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
    const { change, formName } = this.props;
    const file = files[0];
    const filePromise = fileToBase64(file);

    return filePromise.then((base64) => {
      const newFile = {
        name: file.name,
        file_size: file.size,
        type: file.type,
        file: base64
      };
      change(formName, 'list_literature_file', [ newFile ]);
    });
  };

  render() {
    const { isFile } = this.state;

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

        { isFile ?
          <div className="form__field">
            <Dropzone className="article-content-form__dropzone" multiple={ false }
                      accept=".doc, .docx, .rtf"
                      maxSize={ 50 * Math.pow(1024, 2) }
                      onDrop={ this.handleDropFiles }>
              <FileDropPlaceholder />
            </Dropzone>
            <FieldArray name="list_literature_file"
                        component={ props => <ArticleFileList { ...props } /> } />
          </div> :
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
