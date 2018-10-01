import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import './article-wizard.scss';

class ArticleWizard extends Component {
  renderTabs = () => {
    const { steps } = this.props;
    return steps.map((item, index) => (
      <Tab key={ index } className="article-wizard__tab"
           selectedClassName="article-wizard__tab_selected">
        { item.title }
      </Tab>
    ));
  };

  renderPanels = () => {
    const { steps } = this.props;
    return steps.map((item, index) => (
      <TabPanel key={ index }>
        <div className="article-wizard__content">
          { item.component }
        </div>
      </TabPanel>
    ));
  };

  render() {
    return (
      <div className="article-wizard">
        <Tabs>
          <TabList className="article-wizard__tab-list">
            { this.renderTabs() }
          </TabList>

          { this.renderPanels() }
        </Tabs>
      </div>
    );
  }
}

export default ArticleWizard;
