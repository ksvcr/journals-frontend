import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getFormValues, isInvalid, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import ArticleWizard from '~/components/ArticleWizard/ArticleWizard';
import Button from '~/components/Button/Button';
import Icon from '~/components/Icon/Icon';
import ArticleCommonTranslateForm from '~/components/ArticleCommonTranslateForm/ArticleCommonTranslateForm';

import './article-translate-form.scss';
import './assets/save.svg';

const FORM_NAME = 'article-translate';

class ArticleTranslateForm extends Component {
  get formProps() {
    const { id } = this.props;
    return {
      id,
      formName: FORM_NAME
    };
  }

  get wizardSteps() {
    return [
      {
        title: 'Общие сведения',
        component: <ArticleCommonTranslateForm { ...this.formProps } />
      }
    ];
  }

  handleDraftSubmit = () => {
    const { formValues, onDraftSubmit } = this.props;
    onDraftSubmit(formValues);
  };

  renderTools = () => {
    const { handleSubmit, isInvalidForm } = this.props;
    return (
      <React.Fragment>
        <Button onClick={ this.handleDraftSubmit }>
          <Icon name="save" className="article-translate-form__save-icon" />
          Сохранить как черновик
        </Button>
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
  const formValues = getFormValues(FORM_NAME)(state);

  return {
    isInvalidForm,
    formValues
  };
}

ArticleTranslateForm.propTypes = {
  id: PropTypes.number,
  onSubmit: PropTypes.func,
  onDraftSubmit: PropTypes.func
};

export default connect(
  mapStateToProps,
)(ArticleTranslateForm);