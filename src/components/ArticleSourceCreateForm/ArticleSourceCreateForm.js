import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';

import TextField from '~/components/TextField/TextField';
import Button from '~/components/Button/Button';
import Select from '~/components/Select/Select';
import Icon from '~/components/Icon/Icon';
import SourceThesisFields from '~/components/SourceThesisFields/SourceThesisFields';
import SourceArticleSerialEditionFields from '~/components/SourceArticleSerialEditionFields/SourceArticleSerialEditionFields';
import SourceOneVolumeBookFields from '~/components/SourceOneVolumeBookFields/SourceOneVolumeBookFields';
import SourceMultiVolumeBookFields from '~/components/SourceMultiVolumeBookFields/SourceMultiVolumeBookFields';
import SourceElectronic from '~/components/SourceElectronic/SourceElectronic';

import { getLanguagesArray } from '~/store/languages/selector';
import { getRubricsArray } from '~/store/rubrics/selector';

import getSourceTypes from '~/services/getSourceTypes';
import * as validate from '~/utils/validate';

import './article-source-create-form.scss';
import './assets/save.svg';

class ArticleSourceCreateForm extends Component {
  handleSubmit = (formData) => {
    const { field, onSubmit } = this.props;
    // Для многотомного и Однотомного изданий принимается массив авторов
    const multiAuthorsFields = ['SourceMultiVolumeBook', 'SourceElectronic'];
    if (!!~multiAuthorsFields.indexOf(formData.resourcetype)) {
      formData.author = [{ id: 1, initials: 'П. И.', lastname: formData.author }];
    }

    onSubmit(field, { ...formData, isValid: true });
  };

  get rubricsOptions() {
    const { rubricsArray } = this.props;
    return rubricsArray.map(item => ({
      title: item.name,
      value: item.id
    }));
  }

  get languagesOptions() {
    const { languagesArray } = this.props;
    return languagesArray.map(item => ({
      title: item.name,
      value: item.id
    }));
  }

  get specialFields() {
    const { resourceType } = this.props;
    switch (resourceType) {
      case 'SourceThesis':
        return <SourceThesisFields rubricsOptions={ this.rubricsOptions } />;

      case 'SourceArticleSerialEdition':
        return <SourceArticleSerialEditionFields />;

      case 'SourceOneVolumeBook':
        return <SourceOneVolumeBookFields />;

      case 'SourceMultiVolumeBook':
        return <SourceMultiVolumeBookFields />;

      case 'SourceElectronic':
        return <SourceElectronic />;

      default:
        return null;
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="article-source-create-form form" onSubmit={ handleSubmit(this.handleSubmit) }>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_6">
              <label htmlFor="resourcetype" className="form__label">
                Тип источника
              </label>
              <Field name="resourcetype" id="resourcetype" className="select_white" validate={ [validate.required] }
                     component={ props => <Select options={ getSourceTypes() } { ...props } /> } />
            </div>
            <div className="form__col form__col_6">
              <label htmlFor="source_language" className="form__label">
                Язык оригинала
              </label>
              <Field name="language" id="source_language" className="select_white"
                     component={ props => <Select options={ this.languagesOptions } { ...props } /> } />
            </div>
          </div>
        </div>

        { this.specialFields }

        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_4">
              <label htmlFor="source_url" className="form__label">
                URL публикации
              </label>
              <Field name="url" id="source_url" className="text-field_white" component={ TextField }
                     placeholder="Введите URL" />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="source_doi" className="form__label">
                DOI
              </label>
              <Field name="doi" id="source_doi" className="text-field_white" component={ TextField }
                     placeholder="Введите DOI" />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="source_position" className="form__label">
                № в списке
              </label>
              <Field name="position" id="source_position" className="text-field_white" component={ TextField }
                     placeholder="Введите номер" />
            </div>
          </div>
        </div>

        <div className="form__field">
          <Button type="submit">
            <Icon name="save" className="article-source-create-form__save-icon" />
            Сохранить
          </Button>
        </div>
      </form>
    );
  }
}

ArticleSourceCreateForm = reduxForm({
  destroyOnUnmount: false
})(ArticleSourceCreateForm);

function mapStateToProps(state, props) {
  const { formName, data } = props;
  const formSelector = formValueSelector(formName);
  const languagesArray = getLanguagesArray(state);
  const rubricsArray = getRubricsArray(state);
  const resourceType = formSelector(state, 'resourcetype');
  const sourceTypes = getSourceTypes();
  return {
    form: formName,
    languagesArray,
    rubricsArray,
    resourceType,
    initialValues: {
      language: languagesArray.length ? languagesArray[0].id : null,
      rubric: rubricsArray.length ? rubricsArray[0].id : null,
      resourcetype: sourceTypes[0].value,
      defense_country: 132, // Россия
      defense_date: moment().format('YYYY-MM-DD'),
      statement_date: moment().format('YYYY-MM-DD'),
      ...data
    }
  };
}

export default connect(mapStateToProps)(ArticleSourceCreateForm);

