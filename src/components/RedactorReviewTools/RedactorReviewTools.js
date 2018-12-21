import React, {Component} from 'react';
import PropTypes from 'prop-types';

class RedactorReviewTools extends Component {
  render() {
    return (
      <div className="redactor-review-tools">
        <ul className="redactor-review-tools__list">
          <li className="redactor-review-tools__item">
            <button type="button"> Добавить рецензента </button>
          </li>
          <li className="redactor-review-tools__item">
            <button type="button"> Назначить себя </button>
          </li>
        </ul>
      </div>
    );
  }
}

RedactorReviewTools.propTypes = {};

export default RedactorReviewTools;
