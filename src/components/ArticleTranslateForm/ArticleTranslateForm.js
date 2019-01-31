import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isInvalid, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import ArticleWizard from '~/components/ArticleWizard/ArticleWizard';
import Button from '~/components/Button/Button';
import ArticleCommonTranslateForm from '~/components/ArticleCommonTranslateForm/ArticleCommonTranslateForm';
import ArticleSourcesTranslateForm from '~/components/ArticleSourcesTranslateForm/ArticleSourcesTranslateForm';

import './article-translate-form.scss';
import './assets/save.svg';

const FORM_NAME = 'article-translate';

class ArticleTranslateForm extends Component {
  get formProps() {
    const { id } = this.props;
    return {
      id,
      formName: FORM_NAME,
    };
  }

  get wizardSteps() {
    return [
      {
        title: 'Общие сведения',
        component: <ArticleCommonTranslateForm { ...this.formProps } />
      },
      {
        title: 'Список литературы',
        component: <ArticleSourcesTranslateForm { ...this.formProps } />
      }
    ];
  }

  renderTools = () => {
    const { handleSubmit, isInvalidForm } = this.props;
    return (
      <React.Fragment>
        <Button className="button_orange" onClick={ handleSubmit } disabled={ isInvalidForm } >
          Отправить перевод
        </Button>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="article-translate-form">
        <div className="article-translate-form__wizard">
          <ArticleWizard steps={ this.wizardSteps } tools={ this.renderTools } />
        </div>
      </div>
    );
  }
}

ArticleTranslateForm = reduxForm({
  form: FORM_NAME,
  destroyOnUnmount: false,
  enableReinitialize: true
})(ArticleTranslateForm);

function mapStateToProps(state) {
  const isInvalidForm = isInvalid(FORM_NAME)(state);

  return {
    isInvalidForm
  };
}

ArticleTranslateForm.propTypes = {
  id: PropTypes.number,
  onSubmit: PropTypes.func
};

export default connect(
  mapStateToProps,
)(ArticleTranslateForm);
