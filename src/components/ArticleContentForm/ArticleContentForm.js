import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray } from 'redux-form';

import Select from '~/components/Select/Select';
import ContentBlockList from '~/components/ContentBlockList/ContentBlockList';

import getArticleTypes from '~/services/getArticleTypes';

class ArticleContentForm extends Component {
  get typeOptions() {
    return getArticleTypes().map((item, index) => ({ value: index, title: item }))
  }

  renderContentBlockList = (props) => {
    const { formName } = this.props;
    return <ContentBlockList formName={ formName } { ...props } />
  };

  render() {
    return (
      <div className="article-content-form">
        <h2 className="page__title">Текст статьи</h2>
        <div className="form__field">
          <label htmlFor="article_type" className="form__label">Тип статьи</label>
          <Field name="article_type" id="article_type"
                 component={ props => <Select options={ this.typeOptions } { ...props } /> } />
        </div>

        <FieldArray name="blocks" rerenderOnEveryChange={ true }
                    component={ this.renderContentBlockList } />
      </div>
    );
  }
}

export default connect()(ArticleContentForm);
