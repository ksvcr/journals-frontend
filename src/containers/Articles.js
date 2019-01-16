import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthorArticles from '~/containers/AuthorArticles';
import RedactorArticles from '~/containers/RedactorArticles';
import TranslatorArticles from '~/containers/TranslatorArticles';

class Articles extends Component {
  render() {
    const { userRole } = this.props;
    switch (userRole) {
      case 'AUTHOR':
      case 'REVIEWER':
        return <AuthorArticles />;
      case 'REDACTOR':
        return <RedactorArticles />;
      case 'TRANSLATOR':
        return <TranslatorArticles />;
      default:
        return null;
    }
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    userRole: user.data.role
  };
}

export default connect(
  mapStateToProps
)(Articles);