import React, { Component } from 'react';
import { Field, FieldArray, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form'

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
import { getCategoriesArray, getRootCategoriesArray } from '~/store/categories/selector';

import * as validate from '~/utils/validate';

class ArticleCommonForm extends Component {
  state = {
    visibleFields: {
      conflicts: true,
      financing: true,
      addressRadio: false,
      addressList: false
    }
  };

  componentDidUpdate(prevProps) {
    this.setInitialCategory(prevProps.rootCategory);
  }

  get childCategories() {
    const { rootCategoriesArray, categoriesArray, rootCategory } = this.props;
    let rootId;
    if (rootCategory !== undefined) {
      rootId = rootCategory;
    } else if(rootCategoriesArray[0]) {
      rootId = rootCategoriesArray[0].id;
    }

    return categoriesArray
      .filter(item => item.parent === rootId);
  }

  get languagesOptions() {
    const { languagesArray } = this.props;
    return languagesArray.map(item => ({
      title: item.name,
      value: item.id
    }));
  }

  get rubricsOptions() {
    const { rubricsArray } = this.props;
    return rubricsArray.map(item => ({
      title: item.name,
      value: item.id
    }));
  }

  get rootCategoriesOptions() {
    const { rootCategoriesArray } = this.props;
    return rootCategoriesArray
      .map(item => ({
      title: item.translations['ru'].name,
      value: item.id
    }));
  }

  get childCategoriesOptions() {
    return this.childCategories
      .map(item => ({
        title: item.translations['ru'].name,
        value: item.id
      }));
  }

  setInitialCategory = (prevRootCategory) => {
    const { rootCategory, change } = this.props;
    if (rootCategory !== prevRootCategory) {
      if (this.childCategories.length) {
        change('category', this.childCategories[0].id);
      } else {
        change('category', null);
      }
    }
  };

  handleFieldToggle = (event) => {
    const { checked, name } = event.target;
    this.setState(prevState => (
      { visibleFields: { ...prevState.visibleFields, [name]: checked } }
    ));
  };

  handleAddressToggle = (event) => {
    const { value } = event.target;
    const isChecked = value === 'custom-address';
    this.setState(prevState => (
      { visibleFields: { ...prevState.visibleFields, addressList: isChecked } }
    ));
  };

  renderFinancingSourcesList = (props) => {
    return (
      <FieldSetList legend="Грант" addText="Добавить грант" { ...props }>
        { field => <FinancingSourceForm field={ field } /> }
      </FieldSetList>
    );
  };

  renderAddressList = (props) => {
    const initialValues = {
      count: 1
    };

    return (
      <FieldSetList legend="Адрес" addText="Добавить адрес"
                    initialValues={ initialValues } { ...props }>
        { field => <AddressForm field={ field } /> }
      </FieldSetList>
    );
  };

  render() {
    const { visibleFields } = this.state;
    const { handleSubmit } = this.props;
    return (
      <form className="article-common-form form" onSubmit={ handleSubmit }>
        <h2 className="page__title">Общие сведения</h2>
        <div className="form__field">
          <label htmlFor="language" className="form__label">Язык статьи</label>
          <div className="form__row">
            <div className="form__col form__col_4">
              <Field name="language" id="language"
                     component={ props => <Select options={ this.languagesOptions } { ...props } /> } />
            </div>
            <div className="form__col form__col_8">
              <Field name="need_translation" id="need_translation" type="checkbox"
                     component={ Checkbox } >
                Нужен перевод сопроводительной информации на русский
              </Field>
              <FieldHint position={ 'top-end' } text={
                `Наши переводчики быстро и грамотно переведут на русский язык
                всю сопроводительную информацию для вашей статьи.
                Иначе вам придется делать это самостоятельно`
              } />
            </div>
          </div>
        </div>

        <div className="form__row">
          <div className="form__col form__col_4">
            <div className="form__field">
              <label htmlFor="rubric" className="form__label">Направление</label>
              <Field name="rubric" id="rubric"
                     component={ props => <Select options={ this.rubricsOptions } { ...props } /> } />
            </div>
          </div>
          <div className="form__col form__col_4">
            <div className="form__field">
              <label htmlFor="root_category" className="form__label">Категория</label>
              <Field name="root_category" id="root_category"
                     component={ props => <Select options={ this.rootCategoriesOptions } { ...props } /> } />
            </div>
          </div>
          { this.childCategoriesOptions.length > 0 &&
            <div className="form__col form__col_4">
              <div className="form__field">
                <label htmlFor="category" className="form__label">Подкатегория</label>
                <Field name="category" id="category"
                       component={ props => <Select options={ this.childCategoriesOptions } { ...props } /> } />
              </div>
            </div>
          }
        </div>

        <div className="form__field form__field_inline">
          <Field name="agris_unload" id="agris_unload" type="checkbox"
                 component={ Checkbox } >
            Статья AGRIS
          </Field>
          <FieldHint text={ 'Подсказка про AGRIS' } />
        </div>

        <div className="form__field form__field_inline">
          <Field name="georef_unload" id="georef_unload" type="checkbox"
                 component={ Checkbox } >
            Статья GEOREF
          </Field>
          <FieldHint text={ 'Подсказка про GEOREF' } />
        </div>

        <div className="form__field">
          <label htmlFor="title" className="form__label">
            Название статьи <ReqMark />
          </label>
          <Field name="title" id="title" textarea component={ TextField }
                 placeholder="Введите название" validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <label htmlFor="thanks_text" className="form__label">
            Благодарности <ReqMark />
            <FieldHint text={ 'Подсказка про Благодарности' } />
          </label>
          <Field name="thanks_text" id="thanks_text" component={ TextField }
                 placeholder="Введите благодарности" validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <label htmlFor="text_to_keywords" className="form__label">
            Ключевые слова (через запятую) <ReqMark />
            <FieldHint text={ 'Подсказка про Ключевые слова' } />
          </label>
          <Field name="text_to_keywords" id="text_to_keywords" component={ TextField }
                 placeholder="Перечислите ключевые слова" validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <label htmlFor="text_to_description" className="form__label">
            Аннотация <ReqMark />
          </label>
          <Field name="text_to_description" id="text_to_description" textarea component={ TextField }
                 placeholder="Введите аннотацию" validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <label className="form__label">
            Конфликт интересов <ReqMark />
            <FieldHint text={ 'Подсказка про Конфликт интересов' } />
          </label>
          <div className="form__switcher">
            <Switcher checked={ Boolean(visibleFields.conflicts) }
                      name="conflicts" onChange={ this.handleFieldToggle } />
          </div>
          { visibleFields.conflicts &&
            <Field name="conflict_interest" id="conflict_interest" component={ TextField }
                   placeholder="Перечислите конфликты интересов" validate={ [validate.required] } />
          }
        </div>

        <div className="form__field">
          <label className="form__label">
            Финансирование
          </label>
          <div className="form__switcher">
            <Switcher checked={ Boolean(visibleFields.financing) } name="financing"
                      onChange={ this.handleFieldToggle } />
          </div>

          { visibleFields.financing &&
            <FieldArray name="financing_sources" rerenderOnEveryChange={ true }
                        component={ this.renderFinancingSourcesList } />
          }
        </div>

        <div className="form__field">
          <label className="form__label">
            Нужна печатная копия
          </label>
          <div className="form__switcher">
            <Switcher checked={ Boolean(visibleFields.addressRadio) } name="addressRadio" onChange={ this.handleFieldToggle } />
          </div>

          { visibleFields.addressRadio &&
            <div className="form__switcher">
              <Radio name="addressList" value="profile-address" checked={ !Boolean(visibleFields.addressList) }
                     onChange={ this.handleAddressToggle }>
                Адрес, указанный в профиле
              </Radio>
              <Radio name="addressList" value="custom-address" checked={ Boolean(visibleFields.addressList) }
                     onChange={ this.handleAddressToggle }>
                Другой адрес
              </Radio>
            </div>
          }

          { visibleFields.addressList &&
            <FieldArray name="addresses" rerenderOnEveryChange={ true }
                        component={ this.renderAddressList } />
          }
        </div>
      </form>
    );
  }
}

ArticleCommonForm = reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(ArticleCommonForm);


function mapStateToProps(state, props) {
  const { formName } = props;
  const formSelector = formValueSelector(formName);

  let rootCategory = formSelector(state, 'root_category');
  rootCategory = rootCategory && parseInt(rootCategory, 10);
  let category = formSelector(state, 'category');
  category = category && parseInt(category, 10);

  const rootCategoriesArray = getRootCategoriesArray(state);
  const categoriesArray = getCategoriesArray(state);
  const rubricsArray = getRubricsArray(state);
  const languagesArray = getLanguagesArray(state);

  return {
    form: formName,
    rootCategory,
    category,
    rootCategoriesArray,
    categoriesArray,
    rubricsArray,
    languagesArray
  };
}

const mapDispatchToProps = {
  change
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCommonForm);
