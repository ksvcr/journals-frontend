import React, { Component } from 'react';
import { connect } from 'react-redux';

import Select from '~/components/Select/Select';

import { getSitesArray } from '~/store/sites/selector';
import * as sitesActions from '~/store/sites/actions';

class SiteSelect extends Component {
  handleSiteChange = (event) => {
    const { setCurrentSite, onChange } = this.props;
    let { value:currentSite } = event.target;
    currentSite = parseInt(currentSite, 10);
    setCurrentSite(currentSite);
    onChange && onChange();
  };

  get sitesOptions() {
    const { sitesArray } = this.props;
    return sitesArray.map(item => ({
      title: item.name,
      value: item.id
    }));
  }

  render() {
    const { onChange, sitesArray, currentSite, ...restProps } = this.props;
    return (
      <Select value={ currentSite } options={ this.sitesOptions }
              onChange={ this.handleSiteChange } { ...restProps } />
    );
  }
}

function mapStateToProps(state) {
  return {
    currentSite: state.sites.current,
    sitesArray: getSitesArray(state),
  };
}

const mapDispatchToProps = {
  setCurrentSite: sitesActions.setCurrent
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteSelect);
