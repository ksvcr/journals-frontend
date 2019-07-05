import React, { Component } from 'react';
import { Field, FieldArray, change } from 'redux-form';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { withNamespaces } from 'react-i18next';

import Select from '~/components/Select/Select';
import Checkbox from '~/components/Checkbox/Checkbox';
import Radio from '~/components/Radio/Radio';
import TextField from '~/components/TextField/TextField';
import FieldHint from '~/components/FieldHint/FieldHint';
import ReqMark from '~/components/ReqMark/ReqMark';
import Switcher from '~/components/Switcher/Switcher';
import FieldSetList from '~/components/FieldSetList/FieldSetList';
import FinancingSourceForm from '~/components/FinancingSourceForm/FinancingSourceForm';
import AddressForm from '~/components/AddressForm/AddressForm';

import { getLanguagesArray } from '~/store/languages/selector';
import { getRubricsArray } from '~/store/rubrics/selector';
import { getCountriesOptions } from '~/store/countries/selector';
import { getUserData } from '~/store/user/selector';

import * as validate from '~/utils/validate';

class ArticleCommonForm extends Component {
  componentDidMount() {
    const { rubricSet } = this.props;
    this.handleRubricChange(rubricSet.length, rubricSet[rubricSet.length-1]);
  }

  get languagesOptions() {
    const { languagesArray } = this.props;
    return languagesArray.map(item => ({
      title: item.name,
      value: item.twochar_code
    }));
  }

  get rubricsOptions() {
    const { rubricsArray, rubricSet, rubricsData } = this.props;

    return rubricSet.map((id, index) => {
      const rubric = rubricsData[id];

      if (rubric) {
        const parentId = index > 0 ? rubric.parent : null;
        return getOptionsByParent(parentId);
      } else {
        return null;
      }
    });

    function getOptionsByParent(parent) {
      const filtered = rubricsArray.filter(item => item.parent === parent);
      return getOptions(filtered);
    }

    function getOptions(array) {
      return array.map(item => ({
        title: item.name,
        value: item.id
      }));
    }
  }

  get hasPublishAccess() {
    const { userData } = this.props;
    const roles = ['AUTHOR', 'REVIEWER', 'REDACTOR'];
    return Boolean(~roles.indexOf(userData.role));
  }


  handleHasPrintedChange = () => {
    const { change, formName } = this.props;
    change(formName, 'printed[0].use_address_from_profile', false);
    change(formName, 'printed[0].count', 1);
  };

  handleRubricChange = (level, value) => {
    const { change, formName, rubricSet, rubricsArray } = this.props;
    const newRubricSet = rubricSet.map((item, index) => {
      if (index < level) {
        return item;
      } else if (index > level) {
        return null;
      } else {
        return value;
      }
    });

    setDefaultRubric(level, value);

    change(formName, 'rubric_set', newRubricSet);

    function setDefaultRubric(level, value) {
      if (level < 2) {
        const rubricId = parseInt(value, 10);
        const rubric = rubricsArray.find(item => item.parent === rubricId);
        if (rubric) {
          newRubricSet[level+1]= rubric.id;
          setDefaultRubric(level+1, rubric.id);
        }
      }
    }
  };

  renderFinancingSourcesList = props => {
    return (
      <FieldSetList legend="Грант" addText="Добавить грант" { ...props }>
        { field => <FinancingSourceForm field={ field } /> }
      </FieldSetList>
    );
  };

  renderAddressList = props => {
    const { countriesOptions, countriesData } = this.props;
    const initialValues = {
      count: 1
    };

    return (
      <FieldSetList legend="Адрес" addText="Добавить адрес"
                    initialValues={ initialValues } { ...props }>
        { field => (
          <AddressForm field={ field } countriesData={ countriesData }
                       countriesOptions={ countriesOptions } />
        ) }
      </FieldSetList>
    );
  };

  render() {
    const { t, hasFinancing, hasPrinted, isConflictInterest, useAddressFromProfile } = this.props;

    return (
      <div className="article-common-form">
        <h2 className="page__title">{ t('common_content') }</h2>

        { this.hasPublishAccess && (
          <React.Fragment>
            <div className="form__field">
              <label htmlFor="language" className="form__label">
                { t('article_language') }
              </label>
              <div className="form__row">
                <div className="form__col form__col_4">
                  <Field name="language" id="language" options={ this.languagesOptions }
                         component={ Select } />
                </div>
                <div className="form__col form__col_8">
                  <Field name="need_translation" id="need_translation"
                         type="checkbox" component={ Checkbox }>
                    { t('need_translation') }
                  </Field>
                  <FieldHint position={ 'top-end' }
                             text={ `Наши переводчики быстро и грамотно переведут на русский язык
                                     всю сопроводительную информацию для вашей статьи.
                                     Иначе вам придется делать это самостоятельно` } />
                </div>
              </div>
            </div>

            <div className="form__row">
              <div className="form__col form__col_4">
                <div className="form__field">
                  <label htmlFor="rubric_set[0]" className="form__label">
                    { t('direction') }
                  </label>
                  <Field name="rubric_set[0]" id="rubric_set[0]" options={ this.rubricsOptions[0] }
                         onChange={ (e, val) => this.handleRubricChange(0, val) } component={ Select } />
                </div>
              </div>
              { this.rubricsOptions[1] &&
                <div className="form__col form__col_4">
                  <div className="form__field">
                    <label htmlFor="rubric_set[1]" className="form__label">
                      { t('category') }
                    </label>
                    <Field name="rubric_set[1]" id="rubric_set[1]" options={ this.rubricsOptions[1] }
                           onChange={ (e, val) => this.handleRubricChange(1, val) } component={ Select } />
                  </div>
                </div>
              }
              { this.rubricsOptions[2] &&
                <div className="form__col form__col_4">
                  <div className="form__field">
                    <label htmlFor="rubric_set[2]" className="form__label">
                      { t('subcategory') }
                    </label>
                    <Field name="rubric_set[2]" id="rubric_set[2]" options={ this.rubricsOptions[2] }
                           onChange={ (e, val) => this.handleRubricChange(2, val) } component={ Select } />
                  </div>
                </div>
              }
            </div>

            <div className="form__field form__field_inline">
              <Field name="agris_unload" id="agris_unload" type="checkbox"
                     component={ Checkbox }>
                { t('article') } AGRIS
              </Field>
              <FieldHint text={ 'Подсказка про AGRIS' } />
            </div>

            <div className="form__field form__field_inline">
              <Field name="georef_unload" id="georef_unload" type="checkbox"
                     component={ Checkbox } >
                { t('article') } GEOREF
              </Field>
              <FieldHint text={ 'Подсказка про GEOREF' } />
            </div>
          </React.Fragment>
        ) }

        <div className="form__field">
          <label htmlFor="title" className="form__label">
            { t('article_title') } <ReqMark />
          </label>
          <Field name="title" id="title" textarea minRows={ 2 } component={ TextField }
                 placeholder={ t('enter_article_title') } validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <label htmlFor="thanks_text" className="form__label">
            { t('thanks_text') } <ReqMark />
            <FieldHint text={ 'Подсказка про Благодарности' } />
          </label>
          <Field name="thanks_text" id="thanks_text" component={ TextField }
                 placeholder={ t('enter_thanks_text') } validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <label htmlFor="text_to_keywords" className="form__label">
            { t('keywords_with_comma') } <ReqMark />
            <FieldHint text={ 'Подсказка про Ключевые слова' } />
          </label>
          <Field name="text_to_keywords" id="text_to_keywords"
                 component={ TextField } placeholder="Перечислите ключевые слова"
                 validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <label htmlFor="text_to_description" className="form__label">
            { t('annotation') } <ReqMark />
          </label>
          <Field name="text_to_description" id="text_to_description"
                 textarea minRows={ 2 } component={ TextField }
                 placeholder="Введите аннотацию" validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <label className="form__label">
            { t('conflict_of_interest') } <ReqMark />
            <FieldHint text={ 'Подсказка про Конфликт интересов' } />
          </label>
          <div className="form__switcher">
            <Field name="is_conflict_interest" id="is_conflict_interest"
                   trueLabel={ t('yes') } falseLabel={ t('no') }
                   type="checkbox" component={ Switcher } />
          </div>
          { isConflictInterest && (
            <Field name="conflict_interest" id="conflict_interest"
                   component={ TextField } placeholder="Перечислите конфликты интересов"
                   validate={ [validate.required] } />
          ) }
        </div>

        <div className="form__field">
          <label className="form__label">{ t('financing') }</label>
          <div className="form__switcher">
            <Field name="has_financing" id="has_financing" type="checkbox"
                   trueLabel={ t('yes') } falseLabel={ t('no') }
                   component={ Switcher } />
          </div>

          { hasFinancing && (
            <FieldArray
              name="financing_sources"
              component={ this.renderFinancingSourcesList }
            />
          ) }
        </div>

        <div className="form__field">
          <label className="form__label">
            { t('need_printed_copy') }
          </label>
          <div className="form__switcher">
            <Field name="has_printed" id="has_printed" type="checkbox"
                   trueLabel={ t('yes') } falseLabel={ t('no') }
                   component={ Switcher } onChange={ this.handleHasPrintedChange } />
          </div>

          { hasPrinted && (
            <div className="form__switcher">
              <Field name="use_address_from_profile" value={ true }
                     component={ Radio } type="radio" format={ value => Boolean(value) }
                     parse={ value => value === 'true' } >
                { t('address_from_profile') }
              </Field>
              <Field name="use_address_from_profile" value={ false }
                     component={ Radio } type="radio" format={ value => Boolean(value) }
                     parse={ value => value === 'true' } >
                { t('another_address') }
              </Field>
            </div>
          ) }

          { hasPrinted && !useAddressFromProfile &&
            <FieldArray name="printed"
                        component={ this.renderAddressList } />
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { formName } = props;
  const { countries, rubrics } = state;

  const formSelector = formValueSelector(formName);
  const userData = getUserData(state);
  const hasFinancing = formSelector(state, 'has_financing');
  const printed = formSelector(state, 'printed');
  const hasPrinted = formSelector(state, 'has_printed');
  const rubricSet = formSelector(state, 'rubric_set');
  const useAddressFromProfile = formSelector(state, 'use_address_from_profile');
  const isConflictInterest = formSelector(state, 'is_conflict_interest');
  const rubricsArray = getRubricsArray(state);
  const languagesArray = getLanguagesArray(state);
  const countriesOptions = getCountriesOptions(state);

  return {
    userData,
    countriesData: countries.data,
    rubricsData: rubrics.data,
    rubricSet,
    useAddressFromProfile,
    hasFinancing,
    hasPrinted,
    isConflictInterest,
    rubricsArray,
    languagesArray,
    countriesOptions,
    printed
  };
}

const mapDispatchToProps = {
  change
};

ArticleCommonForm = withNamespaces()(ArticleCommonForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleCommonForm);
