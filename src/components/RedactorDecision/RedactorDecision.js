import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as articlesActions from '~/store/articles/actions';

class RedactorDecision extends Component {
  handleAccept = () => {
    const { articleId, editArticle } = this.props;
    editArticle(articleId, { state_article: 'Опубликована' })
  };

  handleDecline = () => {
    const { articleId, editArticle } = this.props;
    editArticle(articleId, { state_article: 'Отклонена' })
  };

  render() {
    return (
      <div className="redactor-decision">
        <button type="button" onClick={ this.handleAccept }>Принять</button>
        <button type="button" onClick={ this.handleDecline }>Отклонить</button>
      </div>
    );
  }
}

RedactorDecision.propTypes = {
  articleId: PropTypes.number
};

const mapDispatchToProps = {
  editArticle: articlesActions.editArticle
};

export default connect(
  null,
  mapDispatchToProps
)(RedactorDecision);
