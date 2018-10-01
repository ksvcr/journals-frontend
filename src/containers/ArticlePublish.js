import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '~/components/Menu/Menu';
import ArticleTopTools from '~/components/ArticleTopTools/ArticleTopTools';
import ArticlePublishForm from '~/components/ArticlePublishForm/ArticlePublishForm';

import * as languagesActions from '~/store/languages/actions';
import * as rubricsActions from '~/store/rubrics/actions';
import * as categoriesActions from '~/store/categories/actions';

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
    const { fetchRubrics, fetchCategories } = this.props;
    return Promise.all([
      fetchRubrics(),
      fetchCategories()
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
                <SiteSelect id="sites-list" onChange={ this.handleRequest } />
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
  fetchLanguages: languagesActions.fetchLanguages,
  fetchRubrics: rubricsActions.fetchRubrics,
  fetchCategories: categoriesActions.fetchCategories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePublish);
