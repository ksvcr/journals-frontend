import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import InlineLoader from '../InlineLoader/InlineLoader';

import './loader-wrapper.scss';

class LoaderWrapper extends Component {
  render() {
    const { isLoading, children } = this.props;
    const loaderClasses = classNames('loader-wrapper', { 'loader-wrapper_active': isLoading });
    return (
      <div className={ loaderClasses }>
        <div className="loader-wrapper__holder">
          { children }
        </div>
        { isLoading &&
          <div className="loader-wrapper__box">
            <div className="loader-wrapper__progress">
              <InlineLoader />
            </div>
          </div>
        }
      </div>
    );
  }
}

LoaderWrapper.propTypes = {
  isLoading: PropTypes.bool
};

export default LoaderWrapper;
