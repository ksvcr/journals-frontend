import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import CancelLink from '~/components/CancelLink/CancelLink';
import SearchPanel from '~/components/SearchPanel/SearchPanel';
import DiscountsTransferSelect from '~/components/DiscountsTransferSelect/DiscountsTransferSelect';
import DiscountsTransferForm from '~/components/DiscountsTransferForm/DiscountsTransferForm';

import * as usersActions from '~/store/users/actions';
import * as discountsActions from '~/store/discounts/actions';

import './discounts-transfer.scss';

const SEARCH_KEY = 'discounts';

class DiscountsTransfer extends Component {
  state = {
    user: null
  };

  handleCancelClick = event => {
    const { onClose } = this.props;
    event.preventDefault();
    onClose();
  };

  handleSearchChange = ({ search_query }) => {
    const { dispatch } = this.props;
    const data = {
      search: search_query,
      limit: 50
    };

    dispatch(usersActions.searchUsers(SEARCH_KEY, data));
  };

  handleUserSelect = id => {
    const { searchResults } = this.props;
    const user = searchResults.find(item => item.id === id);
    this.setState({ user });
  };

  handleTransferSubmit = formData => {
    const { dispatch } = this.props;
    const { user } = this.state;
    const bonusCount =
      formData.bonus_count && parseInt(formData.bonus_count, 10);
    const data = {
      user_id: user.id,
      bonus_count: bonusCount
    };

    dispatch(discountsActions.transfer(data));
  };

  render() {
    const { searchResults, t } = this.props;
    const { user } = this.state;
    return (
      <div className="discounts-transfer">
        <div className="discounts-transfer__cancel">
          <CancelLink onClick={ this.handleCancelClick } text={ t('cancel') } />
        </div>
        { !user ? (
          <div className="discounts-transfer__search">
            <SearchPanel onChange={ this.handleSearchChange } />
            <div className="discounts-transfer__search__results">
              <p className="discounts-transfer__search__count">
                { t('find', { count: searchResults.length }) } { searchResults.length }{ ' ' }
                { t('user', { count: searchResults.length }) }
                :
              </p>
              <DiscountsTransferSelect
                items={ searchResults }
                onSelect={ this.handleUserSelect }
              />
            </div>
          </div>
        ) : (
          <DiscountsTransferForm
            user={ user }
            onSubmit={ this.handleTransferSubmit }
          />
        ) }
      </div>
    );
  }
}

DiscountsTransfer.propTypes = {
  onClose: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { users } = state;
  const { searchData } = users;

  return {
    searchResults: searchData[SEARCH_KEY] || []
  };
}

DiscountsTransfer = withNamespaces()(DiscountsTransfer);

export default connect(mapStateToProps)(DiscountsTransfer);
