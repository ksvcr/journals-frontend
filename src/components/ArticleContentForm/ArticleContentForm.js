import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

class ArticleContentForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="article-authors-form" onSubmit={ handleSubmit }>
        <h2 className="page__title">Авторы</h2>

      </form>
    );
  }
}

ArticleContentForm = reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(ArticleContentForm);


function mapStateToProps(state, props) {
}

export default connect(mapStateToProps)(ArticleContentForm);
