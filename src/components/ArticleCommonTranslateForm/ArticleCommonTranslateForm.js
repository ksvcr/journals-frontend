import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { withNamespaces } from 'react-i18next';

import ReqMark from '~/components/ReqMark/ReqMark';
import TextField from '~/components/TextField/TextField';
import FieldSet from '~/components/FieldSet/FieldSet';

import * as validate from '~/utils/validate';

class ArticleCommonTranslateForm extends Component {
  renderFinancingSources = () => {
    const { t, articleData } = this.props;
    return articleData.financing_sources.map((item, index) => (
      <FieldSet legend={ `Грант №${index + 1}` } key={ item.id }>
        <Field type="hidden" component={ TextField } name={ `financing_sources[${index}].id` } value={ item.id } />
        <div className="form__field">
          <label htmlFor={ `financing_sources[${index}].organization` }
                 className="form__label">
            { t('organization_name') } <ReqMark />
          </label>

          <TextField className="text-field_preview text-field_dark" textarea
                     value={ item.organization } readOnly />
          <Field name={ `financing_sources[${index}].organization` }
                 id={ `financing_sources[${index}].organization` }
                 textarea component={ TextField } className="text-field_white"
                 placeholder="Введите перевод" validate={ [validate.required] } />
        </div>
        <div className="form__field">
          <label htmlFor={ `financing_sources[${index}].grant_name` }
                 className="form__label" >
            { t('title_of_grant') } <ReqMark />
          </label>
          <TextField className="text-field_preview text-field_dark" textarea
                     value={ item.grant_name } readOnly />
          <Field name={ `financing_sources[${index}].grant_name` } id={ `financing_sources[${index}].grant_name` }
                 textarea component={ TextField } className="text-field_white" placeholder={ t('enter_translation') }
                 validate={ [validate.required] } />
        </div>
      </FieldSet>
    ));
  };

  render() {
    const { t, articleData } = this.props;
    return (
      <div className="article-common-translate-form">
        <h2 className="page__title">{ t('common_content') }</h2>

        <div className="form__field">
          <label htmlFor="title" className="form__label">
            { t('article_title') } <ReqMark />
          </label>

          <TextField className="text-field_preview" textarea
                     value={ articleData.title } readOnly />
          <Field name="title" id="title" textarea
                 component={ TextField } placeholder={ t('enter_translation') }
                 validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <label htmlFor="thanks_text" className="form__label">
            { t('thanks_text') } <ReqMark />
          </label>

          <TextField className="text-field_preview" textarea
                     value={ articleData.thanks_text } readOnly />
          <Field name="thanks_text" id="thanks_text"
                 component={ TextField } placeholder={ t('enter_translation') }
                 validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <label htmlFor="text_to_keywords" className="form__label">
            { t('keywords') } <ReqMark />
          </label>

          <TextField className="text-field_preview" textarea
                     value={ articleData.text_to_keywords } readOnly />
          <Field name="text_to_keywords" id="text_to_keywords"
                 component={ TextField } placeholder={ t('enter_translation') }
                 validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <label htmlFor="text_to_keywords" className="form__label">
            { t('annotation') } <ReqMark />
          </label>

          <TextField className="text-field_preview" textarea
                     value={ articleData.text_to_description } readOnly />
          <Field name="text_to_description" id="text_to_description"
                 component={ TextField } placeholder={ t('enter_translation') }
                 validate={ [validate.required] } />
        </div>

        { articleData.conflict_interest && (
          <div className="form__field">
            <label className="form__label">
              { t('conflict_of_interest') } <ReqMark />
            </label>

            <TextField className="text-field_preview" readOnly
                       textarea value={ articleData.conflict_interest } />
            <Field name="conflict_interest" id="conflict_interest"
                   component={ TextField } placeholder={ t('enter_translation') }
                   validate={ [validate.required] } />
          </div>
        ) }
        { articleData.financing_sources.length > 0 && (
          <div className="form__field">
            <label className="form__label">{ t('financing') }</label>
            { this.renderFinancingSources() }
          </div>
        ) }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { id } = props;

  return {
    articleData: state.articles.data[id]
  };
}

ArticleCommonTranslateForm = withNamespaces()(ArticleCommonTranslateForm);

export default connect(mapStateToProps)(ArticleCommonTranslateForm);
