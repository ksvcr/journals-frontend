import React from 'react';
import { withNamespaces } from 'react-i18next';

import './support-contact.scss';

const SupportContact = ({ t }) => {
  const email = 'support@research-journal.org';
  return (
    <div className="support-contact">
      <React.Fragment>
        <div className="support-contact__label">
          { t('support') }:&nbsp;
        </div>
        <a href={`mailto:${email}`} className="support-contact__link">
          { email }
        </a>
      </React.Fragment>
    </div>
  );
};

export default withNamespaces()(SupportContact);
