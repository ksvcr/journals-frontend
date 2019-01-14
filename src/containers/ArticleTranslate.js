import React, { Component } from 'react';
import { connect } from 'react-redux';

class ArticleTranslate extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="page__title">Перевод статьи</h1>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
)(ArticleTranslate);
