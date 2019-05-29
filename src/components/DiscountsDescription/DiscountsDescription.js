import React, { PureComponent } from 'react';
import { withNamespaces } from 'react-i18next';

import './discounts-description.scss';

class DiscountsDescription extends PureComponent {
  render() {
    const { t } = this.props;
    return (
      <p className="discounts-description">
        { t('discounts_description') }
      </p>
    );
  }
}

DiscountsDescription = withNamespaces()(DiscountsDescription);

export default DiscountsDescription;
