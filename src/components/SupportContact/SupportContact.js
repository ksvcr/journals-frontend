import React from 'react';

import './support-contact.scss';

const SupportContact = () => {
  const email = 'support@research-journal.org';
  return (
    <div className="support-contact">
      <React.Fragment>
        <div className="support-contact__label">
          Поддержка сайта:&nbsp;
        </div>
        <a href={`mailto:${email}`} className="support-contact__link">
          { email }
        </a>
      </React.Fragment>
    </div>
  );
};

export default SupportContact;
