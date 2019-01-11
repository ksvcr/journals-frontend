import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as articlesActions from '~/store/articles/actions';

import MultiSwitch from '~/components/MultiSwitch/MultiSwitch';
import Button from '~/components/Button/Button';

import './redactor-decision.scss';

class RedactorDecision extends Component {
  state = {
    decision: null
  };

  handleChange = (value) => {
    this.setState({
      decision: value
    });
  };

  handleSave = () => {
    const { articleId, editArticle } = this.props;
    const { decision } = this.state;
    editArticle(articleId, { state_article: decision });
  };

  get options() {
    return [
      {
        title: 'Принять',
        value: 'AWAIT_PAYMENT'
      },
      {
        title: 'Отклонить',
        value: 'DISAPPROVED'
      }
    ];
  }

  render() {
    const { decision } = this.state;
    const { articleId } = this.props;
    return (
      <div className="redactor-decision">
        <div className="redactor-decision__switch">
          <MultiSwitch options={ this.options } name={ `decision-${articleId}` } value={ decision }
                       onChange={ this.handleChange } />
        </div>
        <div className="redactor-decision__bottom">
          <Button type="button" className="button_orange" onClick={ this.handleSave }>
            Отправить
          </Button>
        </div>
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
