import React, { Component } from 'react';
import classNames from 'classnames';

import RedactorReview from '~/components/RedactorReview/RedactorReview';
import RedactorDecision from '~/components/RedactorDecision/RedactorDecision';
import './redactor-actions.scss';

class RedactorActions extends Component {
  state = {
    actionIndex: null
  };

  get actions() {
    const { articleId } = this.props;
    return [
      {
        title: 'Рецензировать',
        component: <RedactorReview articleId={ articleId } />
      },
      {
        title: 'Решение',
        component: <RedactorDecision articleId={ articleId } />
      }
    ];
  }

  handleTabToggle = (event) => {
    let { index } = event.currentTarget.dataset;
    index = parseInt(index, 10);
    this.setState(({ actionIndex }) => {
      const newIndex = index !== actionIndex ? index : null;
      return { actionIndex: newIndex };
    });
  };

  renderTabs = () => {
    const { actionIndex } = this.state;
    return this.actions.map((item, index) => {
      const tabItemClasses = classNames('redactor-actions__tab-item',
        { 'redactor-actions__tab-item_active': index === actionIndex });
      return (
        <li key={ index } className={ tabItemClasses }>
          <button type="button" className="redactor-actions__tab" data-index={ index } onClick={ this.handleTabToggle }>
            { item.title }
          </button>
        </li>
      );
    });
  };

  renderPanels = () => {
    const { actionIndex } = this.state;
    return this.actions.filter((item, index) => index === actionIndex).map((item, index) => (
      <div key={ index } className="redactor-actions__panel">
        { item.component }
      </div>
    ));
  };

  render() {
    const { actionIndex } = this.state;
    const tabListClasses = classNames('redactor-actions__tab-list',
      { 'redactor-actions__tab-list_active': actionIndex !== null });
    return (
      <div className="redactor-actions">
        <ul className={ tabListClasses }>
          { this.renderTabs() }
        </ul>
        { this.renderPanels() }
      </div>
    );
  }
}

export default RedactorActions;
