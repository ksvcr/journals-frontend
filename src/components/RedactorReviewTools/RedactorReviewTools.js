import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import FieldAddButton from '~/components/FieldAddButton/FieldAddButton';

import './redactor-review-tools.scss';

class RedactorReviewTools extends Component {
  render() {
    const { onReviewerAdd, onSelfInvite, t } = this.props;
    return (
      <div className="redactor-review-tools">
        <ul className="redactor-review-tools__list">
          <li className="redactor-review-tools__item">
            <FieldAddButton className="field-add-button_small" onAdd={ onReviewerAdd }>
              { t('add_reviewer') }
            </FieldAddButton>
          </li>
          <li className="redactor-review-tools__item">
            <button type="button" className="redactor-review-tools__button" onClick={ onSelfInvite }>
              { t('assign_yourself') }
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

RedactorReviewTools.propTypes = {
  onSelfInvite: PropTypes.func,
  onReviewerAdd: PropTypes.func
};

RedactorReviewTools = withNamespaces()(RedactorReviewTools);

export default RedactorReviewTools;
