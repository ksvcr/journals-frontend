import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withNamespaces } from 'react-i18next';

import Button from '~/components/Button/Button'
import * as userActions from '~/store/user/actions';

import './reset-controlled-button.scss';

let ResetControlledButton = (props) => {
  function handleControlledReset() {
    const { resetControlledUser, push } = props;
    resetControlledUser();
    push('/');
  }
  const { t } = props;
  return (
    <div className="reset-controlled-button">
      <Button type="button" className="button_small" onClick={ handleControlledReset }>
        { t('return') }
      </Button>
    </div>
  );
};

const mapDispatchToProps = {
  push,
  resetControlledUser: userActions.resetControlledUser
};

ResetControlledButton = withNamespaces()(ResetControlledButton);

export default connect(
  null,
  mapDispatchToProps
)(ResetControlledButton);
