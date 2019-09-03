import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import { withNamespaces } from 'react-i18next';

import TextField from '~/components/TextField/TextField';
import Button from '~/components/Button/Button';
import Select from '~/components/Select/Select';
import Icon from '~/components/Icon/Icon';
import Radio from '~/components/Radio/Radio';
import SourceThesisFields from '~/components/SourceThesisFields/SourceThesisFields';
import SourceArticleSerialEditionFields from '~/components/SourceArticleSerialEditionFields/SourceArticleSerialEditionFields';
import SourceOneVolumeBookFields from '~/components/SourceOneVolumeBookFields/SourceOneVolumeBookFields';
import SourceMultiVolumeBookFields from '~/components/SourceMultiVolumeBookFields/SourceMultiVolumeBookFields';
import SourceElectronic from '~/components/SourceElectronic/SourceElectronic';
import SourceLegislativeMaterial from '~/components/SourceLegislativeMaterial/SourceLegislativeMaterial';
import SourceStandart from '~/components/SourceStandart/SourceStandart';
import SourcePatent from '~/components/SourcePatent/SourcePatent';
import FreeEntry from '~/components/FreeEntry/FreeEntry';

import { getLanguagesArray } from '~/store/languages/selector';
import { getRubricsArray } from '~/store/rubrics/selector';
import { getLawtypesArray } from '~/store/lawtypes/selector';
import { getCountriesOptions } from '~/store/countries/selector';
import { getUserData } from '~/store/user/selector';

import getSourceTypes from '~/services/getSourceTypes';
import getRightholderTypes from '~/services/getRightholderTypes';
import apiClient from '~/services/apiClient';
import * as validate from '~/utils/validate';

import './article-source-create-form.scss';
import './assets/save.svg';

class ArticleSourceCreateForm extends Component {
  handleSubmit = (formData) => {
    const { field, onSubmit } = this.props;
    onSubmit(field, formData);
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

  get thesisCategories() {
    const { t } = this.props;
    return [{
      title: t('candidates_work'),
      value: '1',
    }, {
      title: t('doctoral_work'),
      value: '2'
    }]
  }

  renderThesisCategories = () => {
    return this.thesisCategories.map((item, index) => (
      <Field key={ index } name="category" value={ item.value }
             type="radio" component={ Radio }>
        { item.title }
      </Field>
    ));
  };

  fetchCountries = (value) => {
    return apiClient.getCountries({ name: value, limit: 5 });
  };

  get lawtypesOptions() {
    const { lawtypes } = this.props;
    return lawtypes.map(item => ({
      title: item.name,
      value: item.id
    }));
  }

  get specialFields() {
    const { resourceType, rightholderType, countriesOptions, countriesData } = this.props;
    switch (resourceType) {
      case 'SourceThesis':
        return <SourceThesisFields rubricsOptions={ this.rubricsOptions }
                                   languagesOptions={ this.languagesOptions }
                                   countriesOptions={ countriesOptions }
                                   countriesData={ countriesData } />;

      case 'SourceArticleSerialEdition':
        return <SourceArticleSerialEditionFields />;

      case 'SourceOneVolumeBook':
        return <SourceOneVolumeBookFields />;

      case 'SourceMultiVolumeBook':
        return <SourceMultiVolumeBookFields />;

      case 'SourceElectronic':
        return <SourceElectronic rubricsOptions={ this.rubricsOptions } />;

      case 'SourceLegislativeMaterial':
        return <SourceLegislativeMaterial countriesOptions={ countriesOptions }
                                          countriesData={ countriesData }
                                          lawTypesOptions={ this.lawtypesOptions }/>;

      case 'SourceStandart':
        return <SourceStandart />;

      case 'SourcePatent':
        return <SourcePatent rightholderType={ rightholderType }
                             rightholderOptions={ getRightholderTypes() }
                             countriesOptions={ countriesOptions }
                             countriesData={ countriesData } />;

      case 'FreeEntry':
        return <FreeEntry />;

      default:
        return null;
    }
  }

  render() {
    const { t, handleSubmit, resourceType, isCorrector } = this.props;
    return (
      <form className="article-source-create-form form" onSubmit={ handleSubmit(this.handleSubmit) }>
        {
          !isCorrector &&
          (
            <div className="form__field">
              <div className="form__row">
                <div className="form__col form__col_6">
                  <label htmlFor="resourcetype" className="form__label">
                    { t('type_of_source') }
                  </label>
                  <Field name="resourcetype" id="resourcetype" className="select_white" validate={ [validate.required] }
                         component={ props => <Select options={ getSourceTypes() } { ...props } /> } />
                </div>

                { resourceType === 'SourceThesis' &&
                  <div className="form__col form__col_6">
                    <label htmlFor="category" className="form__label">
                      { t('type_of_dissertation') }
                    </label>
                    <div className="form__box form__box_radios">
                      { this.renderThesisCategories() }
                    </div>
                  </div>
                }

                { resourceType !== 'SourceThesis' && resourceType !== 'FreeEntry' &&
                  <div className="form__col form__col_6">
                    <label htmlFor="source_language" className="form__label">
                      { t('original_language') }
                    </label>
                    <Field name="language" id="source_language" className="select_white"
                           component={ props => <Select options={ this.languagesOptions } { ...props } /> } />
                  </div>
                }
              </div>
            </div>
          )
        }

        { this.specialFields }

        { resourceType !== 'FreeEntry' &&
          <div className="form__field">
            <div className="form__row">
              <div className="form__col form__col_4">
                <label htmlFor="source_url" className="form__label">
                  { t('publication_url') }
                </label>
                <Field name="url" id="source_url" className="text-field_white" component={ TextField }
                       placeholder={ t('enter_url') } validate={ [validate.url] } />
              </div>
              <div className="form__col form__col_4">
                <label htmlFor="source_doi" className="form__label">
                  DOI
                </label>
                <Field name="doi" id="source_doi" className="text-field_white" component={ TextField }
                       placeholder={ t('enter_doi') } />
              </div>
              <div className="form__col form__col_4">
                <label htmlFor="source_position" className="form__label">
                  { t('number_in_list') }
                </label>
                <Field name="position" id="source_position" className="text-field_white" component={ TextField }
                       placeholder={ t('enter_number') } />
              </div>
            </div>
          </div>
        }

        <div className="form__field">
          <Button type="submit">
            <Icon name="save" className="article-source-create-form__save-icon" />
            { t('save') }
          </Button>
        </div>
      </form>
    );
  }
}

ArticleSourceCreateForm = reduxForm()(ArticleSourceCreateForm);

const defaultDate = moment().format('YYYY-MM-DD');

function mapStateToProps(state, props) {
  const { formName, data } = props;
  const { countries } = state;
  const { role:userRole } = getUserData(state);
  const formSelector = formValueSelector(formName);
  const languagesArray = getLanguagesArray(state);
  const countriesOptions = getCountriesOptions(state);
  const rubricsArray = getRubricsArray(state);
  const resourceType = formSelector(state, 'resourcetype');
  const rightholderType = parseInt(formSelector(state, 'rightholder'), 10);
  const rightholderTypes = getRightholderTypes();
  const sourceTypes = getSourceTypes();
  const lawtypes = getLawtypesArray(state);

  return {
    form: formName,
    languagesArray,
    rubricsArray,
    resourceType,
    rightholderType,
    lawtypes,
    countriesOptions,
    countriesData: countries.data,
    initialValues: {
      language: languagesArray.length ? languagesArray[0].id : null,
      rubric: rubricsArray.length ? rubricsArray[0].id : null,
      resourcetype: sourceTypes[0].value,
      rightholder: rightholderTypes[0].value,
      authors: [{}],
      category: '1',
      defense_date: defaultDate,
      statement_date: defaultDate,
      standart_entry_date: defaultDate,
      adoption_date: defaultDate,
      approval_date: defaultDate,
      patent_application_date: defaultDate,
      publication_date: defaultDate,
      accessed_date: defaultDate,
      ...data
    },
    isCorrector: userRole === 'CORRECTOR'
  };
}

ArticleSourceCreateForm = withNamespaces()(ArticleSourceCreateForm);

export default connect(mapStateToProps)(ArticleSourceCreateForm);

