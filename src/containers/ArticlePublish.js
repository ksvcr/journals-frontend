import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '~/components/Menu/Menu';
import ArticleTopTools from '~/components/ArticleTopTools/ArticleTopTools';
import ArticlePublishForm from '~/components/ArticlePublishForm/ArticlePublishForm';

import * as languageActions from '~/store/languages/actions';
import * as rubricsActions from '~/store/rubrics/actions';
import SiteSelect from '~/components/SiteSelect/SiteSelect';

class ArticlePublish extends Component {
  componentDidMount() {
    this.handleInitialRequest();
  }

  handleInitialRequest = () => {
    const { fetchLanguages } = this.props;
    return Promise.all([
      fetchLanguages(),
      this.handleRequest()
    ]);
  };

  handleRequest = () => {
    const { fetchRubrics } = this.props;
    return Promise.all([
      fetchRubrics()
    ]);
  };

  get menuItems() {
    return [
      {
        title: 'Мои статью',
        href: '/'
      },
      {
        title: 'Мои скидки',
        href: '/second'
      },
      {
        title: 'Настройки',
        href: '/'
      }
    ];
  }

  render() {
    return (
      <React.Fragment>
        <aside className="page__sidebar">
          <Menu items={ this.menuItems } />
        </aside>

        <article className="page__content">
          <ArticleTopTools />
          <h1 className="page__title">Опубликовать статью</h1>

          <div className="page__tools">
            <form className="form">
              <div className="form__field">
                <label htmlFor="sites-list" className="form__label">Для журнала</label>
                <SiteSelect id="sites-list" onChange={ this.handleArticlesRequest } />
              </div>
            </form>
          </div>

          <ArticlePublishForm />
        </article>
      </React.Fragment>
    );
  }
}

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  fetchLanguages: languageActions.fetchLanguages,
  fetchRubrics: rubricsActions.fetchRubrics
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePublish);
