import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Icon from '~/components/Icon/Icon';

import './assets/arrow.svg'
import './article-wizard.scss';

class ArticleWizard extends Component {
  state = {
    stepIndex: 0
  };

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
      <TabPanel key={ index } forceRender={ true } className="article-wizard__panel">
        <div className="article-wizard__content">
          { item.component }
        </div>
      </TabPanel>
    ));
  };

  handleStepChange = (stepIndex) => {
    this.setState({ stepIndex });
  };

  handleStepPrev = () => {
    this.setState((prevState) => ({
      stepIndex: prevState.stepIndex-1
    }));
  };

  handleStepNext = () => {
    this.setState((prevState) => ({
      stepIndex: prevState.stepIndex+1
    }));
  };

  render() {
    const { stepIndex } = this.state;
    const { steps, tools } = this.props;

    return (
      <div className="article-wizard">
        <Tabs selectedIndex={ stepIndex } onSelect={ this.handleStepChange }
              selectedTabPanelClassName="article-wizard__panel_selected">
          <TabList className="article-wizard__tab-list">
            { this.renderTabs() }
          </TabList>
          { this.renderPanels() }
        </Tabs>

        <div className="article-wizard__bottom">
          <button className="article-wizard__nav article-wizard__nav_prev" type="button"
                  disabled={ stepIndex <= 0 } onClick={ this.handleStepPrev }>
            <Icon className="article-wizard__arrow article-wizard__arrow_prev" name="arrow" />
            Назад
          </button>

          { tools &&
            <div className="article-wizard__tools">
              { tools() }
            </div>
          }

          <button className="article-wizard__nav article-wizard__nav_next" type="button"
                  disabled={ stepIndex >= steps.length-1 } onClick={ this.handleStepNext }>
            Далее
            <Icon className="article-wizard__arrow article-wizard__arrow_next" name="arrow" />
          </button>
        </div>
      </div>
    );
  }
}

export default ArticleWizard;
