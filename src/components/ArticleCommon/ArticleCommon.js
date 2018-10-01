import React, {Component} from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form'

import Select from '~/components/Select/Select';
import Checkbox from '~/components/Checkbox/Checkbox';

import { getLanguagesArray } from '~/store/languages/selector';
import { getRubricsArray } from '~/store/rubrics/selector';
import { getCategoriesArray, getRootCategoriesArray } from '~/store/categories/selector';

class ArticleCommon extends Component {
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
    const { rootCategoriesArray, categoriesArray, rootCategory } = this.props;
    let rootId;
    if (rootCategory !== undefined) {
      rootId = rootCategory;
    } else if(rootCategoriesArray[0]) {
      rootId = rootCategoriesArray[0].id;
    }

    return categoriesArray
      .filter(item => item.parent === rootId)
      .map(item => ({
        title: item.translations['ru'].name,
        value: item.id
      }));
  }

  render() {
    return (
      <div className="article-common">
        <h2 className="page__title">Общие сведения</h2>
        <div className="form__field">
          <label htmlFor="language" className="form__label">Язык статьи</label>
          <div className="form__row">
            <div className="form__col form__col_4">
              <Field name="language" id="language"
                     component={ props => <Select options={ this.languagesOptions } { ...props } /> } />
            </div>
            <div className="form__col form__col_8">
              <Field name="need_translation" id="need_translation"
                     component={ Checkbox } >
                Нужен перевод сопроводительной информации на русский
              </Field>
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
      </div>
    );
  }
}

const formSelector = formValueSelector('article-publish');

function mapStateToProps(state) {
  let rootCategory = formSelector(state, 'root_category');
  rootCategory = rootCategory && parseInt(rootCategory, 10);
  return {
    rootCategory,
    languagesArray: getLanguagesArray(state),
    rubricsArray: getRubricsArray(state),
    rootCategoriesArray: getRootCategoriesArray(state),
    categoriesArray: getCategoriesArray(state)
  };
}

export default connect(mapStateToProps)(ArticleCommon);
