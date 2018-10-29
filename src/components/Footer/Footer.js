import React, {Component} from 'react';

import SupportContact from '~/components/SupportContact/SupportContact';

import './footer.scss';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__holder">
          <SupportContact />
        </div>
      </footer>
    );
  }
}

export default Footer;
