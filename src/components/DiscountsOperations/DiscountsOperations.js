import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withNamespaces } from 'react-i18next';

import List from '~/components/List/List';

class DiscountsOperations extends Component {
  get listProps() {
    const { t, operations } = this.props;
    return {
      data: operations,
      head: true,
      cells: [
        {
          style: {
            width: '65%'
          },
          head: () => t('comment'),
          render: (data) => data.comment
        },
        {
          style: {
            width: '20%'
          },
          head: () => t('transaction_date'),
          render: (data) => {
            const { transfer_date:date } = data;
            return moment(date).format('DD.MM.YYYY');
          }
        },
        {
          style: {
            width: '15%'
          },
          head: () => t('amount'),
          render: (data) => Math.abs(data.amount)
        }
      ]
    };
  }

  render() {
    return (
      <div className="discounts-operations">
        <List { ...this.listProps } />
      </div>
    );
  }
}

DiscountsOperations.propTypes = {
  operations: PropTypes.array.isRequired
};

DiscountsOperations = withNamespaces()(DiscountsOperations);

export default DiscountsOperations;
