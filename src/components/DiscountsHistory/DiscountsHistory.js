import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DiscountsOperations from '~/components/DiscountsOperations/DiscountsOperations';

import './discounts-history.scss';

class DiscountsHistory extends Component {
  state = {
    tabIndex: 0
  };

  get tabs() {
    const { incomingOperations, outcomingOperations } = this.props;

    return [
      {
        title: 'История получения',
        component: <DiscountsOperations operations={ incomingOperations } />
      },
      {
        title: 'История использования',
        component: <DiscountsOperations operations={ outcomingOperations } />
      }
    ];
  }

  renderTabs = () => {
    return this.tabs.map((item, index) => (
      <Tab key={ index } className="discounts-history__tab"
      selectedClassName="discounts-history__tab_selected">
        { item.title }
      </Tab>
    ));
  };

  renderPanels = () => {
    return this.tabs.map((item, index) => (
      <TabPanel key={ index } forceRender={ true } className="discounts-history__panel">
        <div className="discounts-history__content">
          { item.component }
        </div>
      </TabPanel>
    ));
  };

  handleTabIndexChange = (tabIndex) => {
    this.setState({ tabIndex });
  };

  render() {
    const { tabIndex } = this.state;
    return (
      <div className="discounts-history">
        <Tabs selectedIndex={ tabIndex } onSelect={ this.handleTabIndexChange }
          selectedTabPanelClassName="discounts-history__panel_selected">
          <TabList className="discounts-history__tab-list">
            { this.renderTabs() }
          </TabList>
          { this.renderPanels() }
        </Tabs>
      </div>
    )
  }
}

DiscountsHistory.propTypes = {
  incomingOperations: PropTypes.array.isRequired,
  outcomingOperations: PropTypes.array.isRequired
};

export default DiscountsHistory;
