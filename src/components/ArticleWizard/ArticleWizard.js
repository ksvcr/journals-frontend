import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux'
import { submit } from 'redux-form'

import Icon from '~/components/Icon/Icon';

import './assets/arrow.svg'
import './article-wizard.scss';

class ArticleWizard extends Component {
  state = {
    stepIndex: 0
  };

  handleSubmit = () => {
    const { name, submit } = this.props;
    submit(name);
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
      <TabPanel key={ index }>
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
    const { steps } = this.props;

    return (
      <div className="article-wizard">
        <Tabs selectedIndex={ stepIndex } onSelect={ this.handleStepChange }>
          <TabList className="article-wizard__tab-list">
            { this.renderTabs() }
          </TabList>

          { this.renderPanels() }
        </Tabs>

        <div className="article-wizard__tools">
          { stepIndex > 0 &&
            <button className="article-wizard__nav article-wizard__nav_prev" type="button"
                    onClick={ this.handleStepPrev }>
              <Icon className="article-wizard__arrow article-wizard__arrow_prev" name="arrow" />
              Назад
            </button>
          }

          <button type="button" onClick={ this.handleSubmit }> Save </button>

          { stepIndex <  steps.length-1 &&
            <button className="article-wizard__nav article-wizard__nav_next" type="button"
                    onClick={ this.handleStepNext }>
              Далее
              <Icon className="article-wizard__arrow article-wizard__arrow_next" name="arrow" />
            </button>
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  submit
};

export default connect(null, mapDispatchToProps)(ArticleWizard);
