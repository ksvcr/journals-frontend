import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Field, FieldArray, formValueSelector} from 'redux-form';
import {withNamespaces} from 'react-i18next';

import Select from '~/components/Select/Select';
import ContentBlockList from '~/components/ContentBlockList/ContentBlockList';

import getArticleTypes from '~/services/getArticleTypes';
import Checkbox from '~/components/Checkbox/Checkbox';

class ArticleContentForm extends Component {
  get typeOptions() {
    return getArticleTypes().map((item, index) => ({ value: index, title: item }))
  }

  renderContentBlockList = (props) => {
    const { formName } = this.props;
    return <ContentBlockList formName={ formName } { ...props } />
  };

  render() {
    const {t} = this.props;
    return (
      <div className="article-content-form">
        <h2 className="page__title">
          {t('article_text')}
        </h2>
        <div className="form__field">
          <Field name="is_send_as_file" id="is_send_as_file" type="checkbox"
                component={Checkbox}>
            Хочу добавить статью файлом
          </Field>
        </div>
        <div className="form__field">
          <label htmlFor="article_type" className="form__label">Тип статьи</label>
          <Field name="article_type" id="article_type"
                 component={ props => <Select options={ this.typeOptions } { ...props } /> } />
        </div>

        <FieldArray name="content_blocks"
                    component={ this.renderContentBlockList } />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const {formName} = props;
  const formSelector = formValueSelector(formName);
  const is_send_as_file = formSelector(state, 'is_send_as_file');
  console.log(is_send_as_file);
  return {
    is_send_as_file
  };
}


ArticleContentForm = withNamespaces()(ArticleContentForm);

export default connect(mapStateToProps)(ArticleContentForm);
