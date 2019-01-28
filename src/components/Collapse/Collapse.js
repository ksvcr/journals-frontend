import React, { Component } from 'react';
import classNames from 'classnames';

import Icon from '~/components/Icon/Icon';

import './assets/arrow.svg';
import './collapse.scss';

class Collapse extends Component {
  state = {
    isOpen: false
  };

  handleToggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  get customHeadProps() {
    const { isOpen } = this.state;

    return {
      isOpen,
      onClick: this.handleToggle
    };
  }

  render() {
    const { title, customHead, children } = this.props;
    const { isOpen } = this.state;

    const collapseClasses = classNames('collapse', { 'collapse_opened': isOpen });

    return (
      <div className={ collapseClasses }>
        { customHead ?
          customHead(this.customHeadProps) :
          (
            <div className="collapse__head" onClick={ this.handleToggle }>
              <div className="collapse__title">
                { title }
              </div>
              <Icon name="arrow" className="collapse__arrow"/>
            </div>
          )
        }

        { isOpen &&
          <div className="collapse__content">
            { children }
          </div>
        }
      </div>
    );
  }
}

export default Collapse;
