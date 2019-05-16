import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthorArticles from '~/containers/AuthorArticles';
import RedactorArticles from '~/containers/RedactorArticles';
import CorrectorArticles from '~/containers/CorrectorArticles';
import TranslatorArticles from '~/containers/TranslatorArticles';

import { getUserData } from '~/store/user/selector';

class Articles extends Component {
  render() {
    const { userRole } = this.props;
    switch (userRole) {
      case 'AUTHOR':
      case 'REVIEWER':
        return <AuthorArticles />;
      case 'REDACTOR':
        return <RedactorArticles />;
      case 'CORRECTOR':
        return <CorrectorArticles />;
      case 'TRANSLATOR':
        return <TranslatorArticles />;
      default:
        return null;
    }
  }
}

function mapStateToProps(state) {
  const { role:userRole } = getUserData(state);
  return {
    userRole
  };
}

export default connect(
  mapStateToProps
)(Articles);
