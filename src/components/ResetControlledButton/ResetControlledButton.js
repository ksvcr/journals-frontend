import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Button from '~/components/Button/Button'
import * as userActions from '~/store/user/actions';

import './reset-controlled-button.scss';

const ResetControlledButton = (props) => {
  function handleControlledReset() {
    const { resetControlledUser, push } = props;
    resetControlledUser();
    push('/');
  }

  return (
    <div className="reset-controlled-button">
      <Button type="button" className="button_small" onClick={ handleControlledReset }>
        Вернуться
      </Button>
    </div>
  );
};

const mapDispatchToProps = {
  push,
  resetControlledUser: userActions.resetControlledUser
};

export default connect(
  null,
  mapDispatchToProps
)(ResetControlledButton);
